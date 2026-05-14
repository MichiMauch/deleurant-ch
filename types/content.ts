// CMS content types — block-based, localised JSON.

export type Seo = {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  keywords: string;
};

// ---------------- Link references ----------------
// Internal links carry a typed reference resolved at render time
// against the same locale's collections / pages. External links
// stay as raw hrefs.

export type LinkRef =
  | { kind: "treatment"; slug: string }
  | { kind: "location"; slug: string }
  | { kind: "pillar"; slug: string }
  | { kind: "page"; slug: "home" | "team" | "termin" | "arbeitgeber" | "ratgeber" }
  | { kind: "external"; href: string };

export type ImageRef = string; // absolute path under /public or Cloudinary URL

// ---------------- Shared sub-types ----------------

export type CtaRef = {
  label: string;
  linkRef: LinkRef;
  subtitle?: string;
};

export type FaqItem = { q: string; a: string };
export type BenefitItem = { title: string; body: string };
export type MetaItem = { label: string; value: string };

// ---------------- Block data types ----------------

export type HeroVideoData = {
  eyebrow?: string;
  headline: string;
  subtitle: string;
  video: string;
  poster: ImageRef;
  ctaPrimary?: CtaRef;
  ctaSecondary?: CtaRef;
};

export type HeroImageData = {
  eyebrow?: string;
  headline: string;
  subtitle: string;
  image: ImageRef;
  badge?: string;
  meta?: MetaItem[];
};

export type WishItem = {
  number: string;
  title: string;
  audience: "Eltern" | "Erwachsene" | "Beide";
  answer: string;
  linkRef: LinkRef;
};
export type WishesGridData = {
  eyebrow?: string;
  headline: string;
  intro: string;
  items: WishItem[];
};

export type TreatmentsTeaserItem = {
  title: string;
  tagline: string;
  photo: ImageRef;
  linkRef: LinkRef;
  accent?: string;
};
export type TreatmentsTeaserData = {
  headline?: string;
  divider?: boolean;
  items: TreatmentsTeaserItem[];
};

export type LocationsTeaserItem = {
  linkRef: LinkRef;
  name: string;
  address: string;
  zip: string;
  image: ImageRef;
  badge?: string;
};
export type LocationsTeaserData = {
  headline: string;
  items: LocationsTeaserItem[];
};

export type TrustStripItem = { kpi: string; label: string };
export type TrustStripData = { items: TrustStripItem[] };

export type MethodStep = { title: string; duration: string };
export type MethodTimelineData = {
  headline: string;
  intro: string;
  steps: MethodStep[];
  cta?: CtaRef;
};

export type TestimonialItem = {
  quote: string;
  name: string;
  treatment: string;
};
export type TestimonialsData = {
  headline: string;
  items: TestimonialItem[];
};

export type BeforeAfterPair = {
  before: ImageRef;
  after: ImageRef;
  duration: string;
  label?: string;
};
export type BeforeAfterSliderData = {
  headline: string;
  intro: string;
  pairs: BeforeAfterPair[];
  theme: "dark" | "light";
};

export type FAQData = {
  headline: string;
  items: FaqItem[];
  jsonLd: boolean;
};

export type RichTextData = {
  html: string;
};

export type PillarsGridData = {
  headline: string;
  intro: string;
  items: { linkRef: LinkRef; title: string; tagline: string }[];
};

export type TeamMemberItem = {
  slug: string;
  name: string;
  role: string;
  standort: string;
  bio?: string;
  image?: ImageRef;
};
export type TeamGridData = {
  headline: string;
  intro?: string;
  members: TeamMemberItem[];
};

export type DoctorSpotlightData = {
  eyebrow: string;
  headline: string;
  credentials: string;
  body: string;
  quote: string;
  image: ImageRef;
  link?: { label: string; linkRef: LinkRef };
};

export type BenefitsGridData = {
  headline: string;
  intro?: string;
  items: BenefitItem[];
};

export type JobItem = {
  slug: string;
  title: string;
  pensum: string;
  standort: string;
  start: string;
  summary: string;
  badge?: string;
};
export type JobsListData = {
  headline: string;
  intro?: string;
  items: JobItem[];
};

export type LocationDetailData = {
  description: string;
  address: { street: string; zip: string; phone: string; email: string };
  hours: MetaItem[];
  transit: { mode: string; detail: string }[];
};

export type MapEmbedData = {
  query: string;
  aspect: "21/9" | "16/9";
};

export type TreatmentDetailData = {
  intro: string;
  long: string;
  benefits: BenefitItem[];
  forWhom: string[];
  priceFrom: string;
  duration: string;
  accent: string;
};

export type ContactStripItem = {
  label: string;
  value: string;
  href: string;
  detail?: string;
};
export type ContactStripData = {
  mode: "phone" | "whatsapp";
  headline: string;
  intro?: string;
  items: ContactStripItem[];
};

export type TerminFormData = {
  introTitle: string;
  introBody: string;
};

export type CallToActionData = {
  headline: string;
  subtitle: string;
  ctaPrimary: CtaRef;
  ctaSecondary?: CtaRef;
  theme?: "dark" | "light" | "outline";
};

// ---------------- Block registry ----------------

export type BlockType =
  | "HeroVideo"
  | "HeroImage"
  | "WishesGrid"
  | "TreatmentsTeaser"
  | "LocationsTeaser"
  | "TrustStrip"
  | "MethodTimeline"
  | "Testimonials"
  | "BeforeAfterSlider"
  | "FAQ"
  | "RichText"
  | "PillarsGrid"
  | "TeamGrid"
  | "DoctorSpotlight"
  | "BenefitsGrid"
  | "JobsList"
  | "LocationDetail"
  | "MapEmbed"
  | "TreatmentDetail"
  | "ContactStrip"
  | "TerminForm"
  | "CallToAction";

export type BlockDataMap = {
  HeroVideo: HeroVideoData;
  HeroImage: HeroImageData;
  WishesGrid: WishesGridData;
  TreatmentsTeaser: TreatmentsTeaserData;
  LocationsTeaser: LocationsTeaserData;
  TrustStrip: TrustStripData;
  MethodTimeline: MethodTimelineData;
  Testimonials: TestimonialsData;
  BeforeAfterSlider: BeforeAfterSliderData;
  FAQ: FAQData;
  RichText: RichTextData;
  PillarsGrid: PillarsGridData;
  TeamGrid: TeamGridData;
  DoctorSpotlight: DoctorSpotlightData;
  BenefitsGrid: BenefitsGridData;
  JobsList: JobsListData;
  LocationDetail: LocationDetailData;
  MapEmbed: MapEmbedData;
  TreatmentDetail: TreatmentDetailData;
  ContactStrip: ContactStripData;
  TerminForm: TerminFormData;
  CallToAction: CallToActionData;
};

export type Section<T extends BlockType = BlockType> = {
  id: string;
  type: T;
  data: BlockDataMap[T];
};

// ---------------- Pages, collections, content ----------------

export type Page = {
  seo?: Partial<Seo>;
  sections: Section[];
};

export type CollectionItem = {
  slug: string;
  seo?: Partial<Seo>;
  sections: Section[];
};

export type CollectionKey = "standorte" | "behandlungen" | "ratgeber";

export type PageKey = "home" | "team" | "termin" | "arbeitgeber" | "ratgeber";

export type LocaleContent = {
  seo: Seo;
  pages: Record<PageKey, Page>;
  collections: Record<CollectionKey, CollectionItem[]>;
};
