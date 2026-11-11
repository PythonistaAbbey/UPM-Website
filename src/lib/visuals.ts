import { media, type MediaAsset } from "@/data/media";

/** Chooses temporary artwork for a field or news category until real photography is licensed. */
export function mediaForField(field: string): MediaAsset {
  if (/Agriculture|Food/.test(field)) return media.agriculture;
  if (/Environment|Forestry/.test(field)) return media.canopy;
  if (/Life Sciences|Health|Natural Sciences|Engineering|Computing/.test(field)) return media.lab;
  if (/Education|Languages|Social|Business|Design/.test(field)) return media.library;
  return media.hero;
}

export function mediaForNews(category: string): MediaAsset {
  const map: Record<string, MediaAsset> = {
    Ceremonies: media.graduation, "Academic calendar": media.library, International: media.water, Admissions: media.hero,
    Research: media.lab, Students: media.evening, "Campus life": media.library, Partnerships: media.agriculture,
  };
  return map[category] ?? media.canopy;
}
