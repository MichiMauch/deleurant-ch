import { Reveal } from "@/components/reveal";
import type { MapEmbedData } from "@/types/content";

export function MapEmbedBlock({ data }: { data: MapEmbedData; pathPrefix: string }) {
  const aspect = data.aspect === "21/9" ? "aspect-[21/9]" : "aspect-[16/9]";
  return (
    <section className="pb-24 lg:pb-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal>
          <div className={`relative ${aspect} overflow-hidden bg-bone-deep/40`}>
            <iframe
              title="Karte"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=&layer=mapnik&marker=&q=${encodeURIComponent(
                data.query,
              )}`}
              className="absolute inset-0 w-full h-full grayscale-[60%] contrast-[105%]"
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
