import type { Metadata } from "next";
import { Open_Sans, Cormorant_Garamond } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { EditModeProvider } from "@/components/cms/EditModeProvider";
import { EditModeIndicator } from "@/components/cms/EditModeIndicator";
import { LocaleProvider } from "@/components/cms/LocaleProvider";
import { getRequestLocale, isEditor } from "@/lib/cms/request-locale";
import { listLocales } from "@/i18n/locales.server";

const openSans = Open_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Praxis Yann Deleurant — Fachzahnarzt für Kieferorthopädie",
  description:
    "Ihr Fachzahnarzt für Kieferorthopädie in Luzern, Sursee und Küssnacht. Festsitzende, abnehmbare und unsichtbare Zahnspangen.",
  icons: {
    icon: "/favicon-32.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Praxis Yann Deleurant — Fachzahnarzt für Kieferorthopädie",
    description:
      "Kieferorthopädie auf höchstem Niveau in Luzern, Sursee und Küssnacht am Rigi.",
    locale: "de_CH",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [locale, editor, locales] = await Promise.all([
    getRequestLocale(),
    isEditor(),
    listLocales(),
  ]);
  return (
    <html
      lang={locale}
      className={`${openSans.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bone text-ink">
        <EditModeProvider enabled={editor}>
          <LocaleProvider value={locale}>
            <Navigation locale={locale} locales={locales} />
            <main className="flex-1">{children}</main>
            <Footer />
            <EditModeIndicator />
          </LocaleProvider>
        </EditModeProvider>
        <Script
          src="https://media-library.cloudinary.com/global/all.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
