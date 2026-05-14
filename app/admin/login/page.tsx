import type { Metadata } from "next";
import { login } from "./actions";

export const metadata: Metadata = {
  title: "Login — Deleurant CMS",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<{ from?: string; error?: string }>;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { from = "/admin/seo", error } = await searchParams;

  return (
    <main className="min-h-screen flex items-center justify-center bg-bone-deep/40 px-6">
      <form
        action={login}
        className="w-full max-w-md space-y-6 rounded-2xl border border-line bg-bone p-8 shadow-sm"
      >
        <header>
          <h1 className="serif text-2xl text-ink font-light">CMS-Login</h1>
          <p className="mt-1 text-sm text-mute">
            Passwort eingeben, um den Edit-Mode und die Admin-Bereiche zu öffnen.
          </p>
        </header>

        <input type="hidden" name="from" value={from} />

        <label className="block">
          <span className="text-xs uppercase tracking-wide text-mute">Passwort</span>
          <input
            type="password"
            name="password"
            required
            autoFocus
            autoComplete="current-password"
            className="mt-2 w-full rounded-lg border border-line bg-bone px-3.5 py-2.5 text-sm text-ink placeholder:text-mute focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy transition"
          />
        </label>

        {error === "wrong" && (
          <p className="text-sm text-red-700">Falsches Passwort.</p>
        )}
        {error === "server" && (
          <p className="text-sm text-red-700">
            Server-seitig fehlt das EDIT_PASSWORD — bitte ENV setzen.
          </p>
        )}

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-5 py-2.5 text-sm font-semibold text-bone shadow-sm hover:bg-ink/90 transition"
        >
          Anmelden
        </button>

        <p className="text-xs text-mute">
          Nach erfolgreichem Login bist du 30 Tage angemeldet. Logout via{" "}
          <code className="font-mono">document.cookie</code>-Löschen oder{" "}
          <code className="font-mono">/admin/login</code> in Inkognito.
        </p>
      </form>
    </main>
  );
}
