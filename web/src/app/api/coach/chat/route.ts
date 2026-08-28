import { NextResponse } from "next/server";
import { streamText } from "ai";
import { z } from "zod";
import { auth } from "@/auth";
import { retrieve, formatGrounding } from "@/lib/coach";
import { anthropic, COACH_MODEL } from "@/lib/anthropic";
import { rateLimit } from "@/lib/rate-limit";

export const maxDuration = 60;

const bodySchema = z.object({
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(2000) }))
    .min(1)
    .max(20),
});

const SYSTEM = `Uri "Umutoza", umwarimu w'amategeko y'umuhanda mu Rwanda (Amategeko y'Umuhanda / Code de la route). Ufasha abanyeshuri biteguye ikizamini cya provisoire.

Amabwiriza:
- Subiza mu Kinyarwanda cyoroshye, mu magambo make kandi asobanutse.
- Ushingira GUSA ku nyandiko z'inyongera uhawe hamwe n'amategeko y'umuhanda y'u Rwanda uzi neza. Niba ikibazo kitari mu byerekeye amategeko y'umuhanda cyangwa gutwara ibinyabiziga, wange ubyubaha uti: "Ndi hano kugufasha ku byerekeye amategeko y'umuhanda gusa."
- Ntuzahimbe amategeko. Niba utazi igisubizo neza, byivugire.
- Shishikaza umunyeshuri.`;

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });

  const client = anthropic();
  if (!client) return NextResponse.json({ error: "no_api_key" }, { status: 501 });

  const rl = rateLimit(`coach-chat:${session.user.id}`, 40, 60 * 60 * 1000);
  if (!rl.ok) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "invalid" }, { status: 400 });

  const messages = parsed.data.messages;
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  const grounding = formatGrounding(retrieve(lastUser?.content ?? "", 10));

  const result = streamText({
    model: client(COACH_MODEL),
    system: `${SYSTEM}\n\nInyandiko z'inyongera zishingiweho ku kibazo cya nyuma:\n${grounding}`,
    messages,
    maxOutputTokens: 700,
  });

  return result.toTextStreamResponse();
}
