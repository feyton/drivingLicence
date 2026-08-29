"""
Extract per-question sign images from the source PDFs.

For every parked "needs image" question we know its source PDF + page. On that
page we locate the question's own text block, take the vertical band running to
the next question, and then:

  * exactly one embedded image in the band -> export that image on its own
    (a clean picture of the sign)
  * two or more images -> render the whole band at high DPI, so the option
    layout (a/b/c/d labels next to their pictures) is preserved as one figure

Output: pipeline/sign-images/<slug>.png  +  sign-images-map.json
Usage:  python extract-sign-images.py [--limit N]
"""
import fitz, json, os, re, sys, hashlib, unicodedata

DIR = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(os.path.dirname(DIR), "Driving Licence")
OUT = os.path.join(DIR, "sign-images")
PARKED = os.path.join(DIR, "parked-needs-image.json")

DPI = 200
ZOOM = DPI / 72.0
MIN_IMG_PX = 40           # ignore rules/bullets/logos
BAND_PAD = 6              # pt of breathing room around a rendered band


def norm(s: str) -> str:
    s = unicodedata.normalize("NFKD", str(s or ""))
    s = s.replace("’", "'").replace("‘", "'").replace("�", "")
    s = re.sub(r"[^0-9a-zA-Z' ]+", " ", s)
    return re.sub(r"\s+", " ", s).strip().lower()


def words_of(s, n=8):
    return norm(s).split(" ")[:n]


def overlap_score(a_words, text):
    """How many of the question's leading words appear in this block."""
    t = norm(text)
    return sum(1 for w in a_words if len(w) > 2 and w in t)


def question_bands(page, questions):
    """Return {index_in_questions: (y_top, y_bottom)} for questions found on the page."""
    blocks = [b for b in page.get_text("blocks") if b[6] == 0]  # text blocks only
    blocks.sort(key=lambda b: b[1])
    hits = []
    for qi, q in enumerate(questions):
        qw = words_of(q["text"])
        if not qw:
            continue
        best, best_s = None, 0
        for b in blocks:
            s = overlap_score(qw, b[4])
            if s > best_s:
                best, best_s = b, s
        # need a decent share of the leading words to trust the match
        if best is not None and best_s >= max(2, min(4, len([w for w in qw if len(w) > 2]))):
            hits.append((best[1], qi))
    hits.sort()
    bands = {}
    page_bottom = page.rect.y1
    for i, (ytop, qi) in enumerate(hits):
        ybot = hits[i + 1][0] if i + 1 < len(hits) else page_bottom
        bands[qi] = (ytop, ybot)
    return bands


def usable_images(page):
    out = []
    for im in page.get_images(full=True):
        xref = im[0]
        try:
            rects = page.get_image_rects(xref)
        except Exception:
            continue
        for r in rects:
            if r.width >= 20 and r.height >= 20:
                out.append((xref, r))
    return out


def slug_for(q):
    h = hashlib.sha1((q["sourceFile"] + "|" + q["text"][:120]).encode("utf-8")).hexdigest()[:12]
    return f"sign-{h}"


def main():
    limit = None
    if "--limit" in sys.argv:
        limit = int(sys.argv[sys.argv.index("--limit") + 1])

    parked = json.load(open(PARKED, encoding="utf-8"))
    parked = [q for q in parked if str(q.get("sourceFile", "")).lower().endswith(".pdf")]
    if limit:
        parked = parked[:limit]

    os.makedirs(OUT, exist_ok=True)
    by_src = {}
    for q in parked:
        by_src.setdefault(q["sourceFile"], []).append(q)

    mapping, stats = [], {"no_image": 0, "not_located": 0, "no_page": 0}

    for src, qs in by_src.items():
        path = os.path.join(SRC, src)
        if not os.path.exists(path):
            print(f"  !! missing source: {src}")
            continue
        doc = fitz.open(path)
        by_page = {}
        for q in qs:
            p = q.get("sourcePage")
            if not isinstance(p, int) or p < 1 or p > doc.page_count:
                stats["no_page"] += 1
                continue
            by_page.setdefault(p, []).append(q)

        for pno, pqs in sorted(by_page.items()):
            page = doc[pno - 1]
            imgs = usable_images(page)
            bands = question_bands(page, pqs)
            for qi, q in enumerate(pqs):
                if qi not in bands:
                    stats["not_located"] += 1
                    continue
                ytop, ybot = bands[qi]
                inband = [(x, r) for (x, r) in imgs if r.y0 >= ytop - 4 and r.y0 < ybot]
                if not inband:
                    stats["no_image"] += 1
                    continue
                slug = slug_for(q)
                opts = q.get("options", [])
                entry = {
                    "slug": slug,
                    "sourceFile": src,
                    "sourcePage": pno,
                    "text": q["text"],
                    "options": opts,
                    "answer": q.get("answer"),
                    "category": q.get("category", "signs"),
                    "explanation": q.get("explanation"),
                    "image": None,
                    "optionImages": {},
                }

                def save_xref(xref, dest):
                    d = doc.extract_image(xref)
                    if d["width"] < MIN_IMG_PX or d["height"] < MIN_IMG_PX:
                        return False
                    pix = fitz.Pixmap(doc, xref)
                    if pix.n - pix.alpha >= 4:      # CMYK -> RGB
                        pix = fitz.Pixmap(fitz.csRGB, pix)
                    pix.save(dest)
                    return True

                if len(inband) == 1:
                    # A single sign belonging to the question itself.
                    if not save_xref(inband[0][0], os.path.join(OUT, slug + ".png")):
                        stats["no_image"] += 1
                        continue
                    entry["image"] = slug + ".png"
                    kind = "single"

                elif len(inband) == len(opts) and len(opts) >= 2:
                    # The options ARE pictures: map them to A/B/C/D in reading
                    # order (row by row, then left to right). This avoids
                    # rendering the page text, which in these sources carries
                    # highlighting that would give the answer away.
                    rows = sorted(inband, key=lambda t: (round(t[1].y0 / 24), t[1].x0))
                    ok = True
                    for idx, (xref, _r) in enumerate(rows):
                        oid = opts[idx]["id"]
                        fn = f"{slug}-{oid}.png"
                        if not save_xref(xref, os.path.join(OUT, fn)):
                            ok = False
                            break
                        entry["optionImages"][oid] = fn
                    if not ok or not entry["optionImages"]:
                        stats["no_image"] += 1
                        continue
                    kind = "per-option"

                else:
                    # Fall back to a tight crop of just the picture area — never
                    # the surrounding text, so answer highlighting can't leak.
                    x0 = max(page.rect.x0, min(r.x0 for _, r in inband) - BAND_PAD)
                    x1 = min(page.rect.x1, max(r.x1 for _, r in inband) + BAND_PAD)
                    y0 = max(page.rect.y0, min(r.y0 for _, r in inband) - BAND_PAD)
                    y1 = min(page.rect.y1, max(r.y1 for _, r in inband) + BAND_PAD)
                    pix = page.get_pixmap(matrix=fitz.Matrix(ZOOM, ZOOM), clip=fitz.Rect(x0, y0, x1, y1))
                    pix.save(os.path.join(OUT, slug + ".png"))
                    entry["image"] = slug + ".png"
                    kind = "crop"

                entry["kind"] = kind
                entry["images"] = len(inband)
                stats[kind] = stats.get(kind, 0) + 1
                mapping.append(entry)
        doc.close()

    json.dump(mapping, open(os.path.join(DIR, "sign-images-map.json"), "w", encoding="utf-8"),
              ensure_ascii=False, indent=1)
    print("candidates:", len(parked))
    print("stats:", stats)
    print("exported:", len(mapping), "->", OUT)


if __name__ == "__main__":
    main()
