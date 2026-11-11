import type { MediaAsset } from "@/data/media";

/**
 * Responsive <picture> with AVIF + WebP variants, intrinsic size, blur placeholder,
 * lazy loading by default and high fetch priority for the hero.
 */
export function MediaImage({ asset, sizes = "100vw", priority = false, className = "", imgClassName = "", decorative = false }: {
  asset: MediaAsset; sizes?: string; priority?: boolean; className?: string; imgClassName?: string; decorative?: boolean;
}) {
  const set = (ext: string) => asset.widths.map((w) => `${asset.base}-${w}.${ext} ${w}w`).join(", ");
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      <img
        src={`${asset.base}-1280.webp`}
        width={asset.width}
        height={asset.height}
        alt={decorative ? "" : asset.alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        style={asset.blurDataURL ? { backgroundImage: `url(${asset.blurDataURL})`, backgroundSize: "cover" } : undefined}
        className={`h-full w-full object-cover ${imgClassName}`}
        data-media-id={asset.id}
      />
    </picture>
  );
}

export function TempArtLabel({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[0.7rem] font-medium text-white backdrop-blur ${className}`}>
      <span aria-hidden="true">◇</span> Temporary artwork · awaiting licensed UPM photography
    </span>
  );
}
