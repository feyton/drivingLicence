// Next.js 16 proxy (successor of middleware.ts).
// Route protection is driven by the `authorized` callback in src/auth.ts.
export { auth as proxy } from "@/auth";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|ico)).*)"],
};
