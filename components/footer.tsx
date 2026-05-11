import Image from "next/image";
import Link from "next/link";

const locations = [
  {
    name: "Luzern",
    address: "Theaterstrasse 5\n6003 Luzern",
    email: "luzern@deleurant.ch",
  },
  {
    name: "Sursee",
    address: "Christoph-Schnyder-Strasse 2a\n6210 Sursee",
    email: "sursee@deleurant.ch",
  },
  {
    name: "Küssnacht",
    address: "Bahnhofstrasse 15\n6403 Küssnacht am Rigi",
    email: "kuessnacht@deleurant.ch",
  },
];

export function Footer() {
  return (
    <footer className="bg-ink text-bone/70 mt-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-24 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Image
              src="/images/logo.png"
              alt="Praxis Yann Deleurant"
              width={504}
              height={129}
              className="h-16 w-auto"
            />
            <p className="mt-8 serif text-xl italic text-bone/85 leading-snug max-w-xs font-light">
              Kieferorthopädie aus einer Hand.
            </p>
            <p className="mt-4 text-sm leading-relaxed max-w-xs">
              Drei Standorte in der Zentralschweiz. Ein Team. Eine Handschrift.
            </p>
            <a
              href="tel:+41412100455"
              className="mt-6 inline-flex items-center gap-3 text-bone hover:text-bone/70 transition-colors"
            >
              <span className="h-px w-8 bg-bone/40" />
              041 210 04 55
            </a>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {locations.map((l) => (
              <div key={l.name}>
                <div className="eyebrow text-bone/50">{l.name}</div>
                <div className="mt-4 text-sm text-bone whitespace-pre-line leading-relaxed">
                  {l.address}
                </div>
                <a
                  href={`mailto:${l.email}`}
                  className="mt-3 inline-block text-xs text-bone/60 hover:text-bone transition-colors"
                >
                  {l.email}
                </a>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2">
            <div className="eyebrow text-bone/50">Sprechzeiten</div>
            <div className="mt-4 text-sm text-bone leading-relaxed">
              Mo – Fr
              <br />
              08:00 – 12:30
              <br />
              13:30 – 17:00
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-bone/10 flex flex-col sm:flex-row justify-between gap-4 text-xs text-bone/40">
          <div>
            © {new Date().getFullYear()} Praxis Yann Deleurant. Alle Rechte
            vorbehalten.
          </div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-bone transition-colors">
              Datenschutz
            </Link>
            <Link href="#" className="hover:text-bone transition-colors">
              Impressum
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
