import type { BlockDataMap, BlockType, Section } from "@/types/content";
import { HeroVideoBlock } from "./HeroVideoBlock";
import { HeroImageBlock } from "./HeroImageBlock";
import { WishesGridBlock } from "./WishesGridBlock";
import { TreatmentsTeaserBlock } from "./TreatmentsTeaserBlock";
import { LocationsTeaserBlock } from "./LocationsTeaserBlock";
import { TrustStripBlock } from "./TrustStripBlock";
import { MethodTimelineBlock } from "./MethodTimelineBlock";
import { TestimonialsBlock } from "./TestimonialsBlock";
import { BeforeAfterSliderBlock } from "./BeforeAfterSliderBlock";
import { FAQBlock } from "./FAQBlock";
import { RichTextBlock } from "./RichTextBlock";
import { PillarsGridBlock } from "./PillarsGridBlock";
import { TeamGridBlock } from "./TeamGridBlock";
import { DoctorSpotlightBlock } from "./DoctorSpotlightBlock";
import { BenefitsGridBlock } from "./BenefitsGridBlock";
import { JobsListBlock } from "./JobsListBlock";
import { LocationDetailBlock } from "./LocationDetailBlock";
import { MapEmbedBlock } from "./MapEmbedBlock";
import { TreatmentDetailBlock } from "./TreatmentDetailBlock";
import { ContactStripBlock } from "./ContactStripBlock";
import { TerminFormBlock } from "./TerminFormBlock";
import { CallToActionBlock } from "./CallToActionBlock";
import { EditableBlock } from "./EditableBlock";

type BlockComponent<T extends BlockType> = React.ComponentType<{
  data: BlockDataMap[T];
  pathPrefix: string;
}>;

const REGISTRY: { [K in BlockType]: BlockComponent<K> } = {
  HeroVideo: HeroVideoBlock,
  HeroImage: HeroImageBlock,
  WishesGrid: WishesGridBlock,
  TreatmentsTeaser: TreatmentsTeaserBlock,
  LocationsTeaser: LocationsTeaserBlock,
  TrustStrip: TrustStripBlock,
  MethodTimeline: MethodTimelineBlock,
  Testimonials: TestimonialsBlock,
  BeforeAfterSlider: BeforeAfterSliderBlock,
  FAQ: FAQBlock,
  RichText: RichTextBlock,
  PillarsGrid: PillarsGridBlock,
  TeamGrid: TeamGridBlock,
  DoctorSpotlight: DoctorSpotlightBlock,
  BenefitsGrid: BenefitsGridBlock,
  JobsList: JobsListBlock,
  LocationDetail: LocationDetailBlock,
  MapEmbed: MapEmbedBlock,
  TreatmentDetail: TreatmentDetailBlock,
  ContactStrip: ContactStripBlock,
  TerminForm: TerminFormBlock,
  CallToAction: CallToActionBlock,
};

type Props = {
  sections: Section[];
  /** Dot-path to the sections array, e.g. "pages.home.sections" */
  scope: string;
};

export function BlockRenderer({ sections, scope }: Props) {
  return (
    <>
      {sections.map((section, i) => {
        const Component = REGISTRY[section.type] as BlockComponent<typeof section.type>;
        if (!Component) {
          return (
            <UnknownBlock key={section.id} id={section.id} type={section.type} index={i} />
          );
        }
        return (
          <EditableBlock key={section.id} id={section.id} type={section.type} index={i}>
            <Component data={section.data} pathPrefix={`${scope}.${i}.data`} />
          </EditableBlock>
        );
      })}
    </>
  );
}

function UnknownBlock({ id, type, index }: { id: string; type: string; index: number }) {
  return (
    <div className="bg-amber-50 border-y-2 border-dashed border-amber-300 px-6 py-8 text-center text-sm text-amber-900">
      Unbekannter Block-Typ <code className="font-mono font-semibold">{type}</code> (Position{" "}
      {index}, id {id.slice(0, 8)}…) — bitte im Block-Manager entfernen.
    </div>
  );
}
