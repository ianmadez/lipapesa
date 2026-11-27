/**
 * Local royalty-free photography (Unsplash License). Credits: public/images/CREDITS.md.
 *
 * The site is a static export, so Next's image optimizer is off (`images.unoptimized`).
 * We pre-generate WebP variants instead (480/800/1200/1600 px) in public/images/opt/
 * and serve them with srcset, so a phone downloads ~20 KB instead of a 240 KB JPEG.
 * Alt text: `dict.pages.alts[key]`.
 */
import { BASE_PATH } from "./site";
import { PHOTO_MANIFEST } from "./photoManifest";

export type PhotoKey = keyof typeof PHOTO_MANIFEST;

export interface PhotoSource {
  src: string;
  srcSet: string;
  width: number;
  height: number;
  blur: string;
}

const url = (file: string, w: number) => `${BASE_PATH}/images/opt/${file}-${w}.webp`;

export const photoSource = (key: PhotoKey): PhotoSource => {
  const p = PHOTO_MANIFEST[key];
  const ws = p.widths as readonly number[];
  return {
    src: url(p.file, ws[Math.min(1, ws.length - 1)]),
    srcSet: ws.map((w) => `${url(p.file, w)} ${w}w`).join(", "),
    width: p.width,
    height: p.height,
    blur: p.blur,
  };
};
