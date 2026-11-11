import generated from "../../public/media/temp/generated.json";

/**
 * Media asset manifest. Every image used by the site is listed here with its rights status.
 * See MEDIA_REGISTER.md for candidate UPM photography and why it is not yet bundled.
 */
export type RightsStatus =
  | "original-temporary" // drawn for this prototype; free to use; must be replaced by licensed photography
  | "licensed" // licence verified and recorded
  | "pending"; // candidate identified, licence or authorisation not yet confirmed

export interface MediaAsset {
  id: string;
  /** Base path; variants are `${base}-${width}.{avif,webp}`. */
  base: string;
  widths: number[];
  width: number;
  height: number;
  alt: string;
  intendedUse: string;
  sourcePage: string;
  attribution: string;
  rights: RightsStatus;
  blurDataURL?: string;
  temporary: boolean;
}

const blur = Object.fromEntries((generated as { id: string; blurDataURL: string }[]).map((g) => [g.id, g.blurDataURL]));
const temp = (id: string, alt: string, intendedUse: string): MediaAsset => ({
  id, base: `/media/temp/${id}`, widths: [640, 1280, 1920, 2400], width: 2400, height: 1500, alt, intendedUse,
  sourcePage: "scripts/generate-temp-media.mjs", attribution: "Original artwork generated for this prototype",
  rights: "original-temporary", blurDataURL: blur[id], temporary: true,
});

export const media = {
  hero: temp("campus-golden-hour", "Illustration of modern campus buildings across a lake at sunset, framed by rain trees", "Homepage hero"),
  canopy: temp("green-canopy", "Illustration of a dense tropical tree canopy with sunlight filtering through", "Discover UPM, sustainability"),
  lab: temp("research-lab", "Illustration of laboratory flasks and a molecular network diagram", "Research showcase"),
  library: temp("library-facade", "Illustration of a library facade with tall vertical fins lit warmly from inside", "Libraries, learning"),
  graduation: temp("graduation", "Illustration of graduation caps tossed into a blue sky", "Convocation, student life"),
  agriculture: temp("agriculture-fields", "Illustration of crop rows stretching towards a sunrise horizon", "Agriculture and food research"),
  evening: temp("campus-evening", "Illustration of warm evening lights glowing above a dark skyline", "Student life, events"),
  water: temp("water-research", "Illustration of layered teal water waves", "Aquaculture and environment"),
} satisfies Record<string, MediaAsset>;

export type MediaKey = keyof typeof media;
export const allMedia: MediaAsset[] = Object.values(media);
