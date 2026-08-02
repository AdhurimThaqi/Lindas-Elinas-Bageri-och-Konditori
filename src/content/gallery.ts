/**
 * Gallery images. Drop the real photos at these paths (see ASSET_CHECKLIST.md)
 * and the gallery fills in automatically. `span` gives the masonry layout its
 * varied rhythm. `category` renders as a subtle caption.
 */
export interface GalleryImage {
  src: string;
  alt: string;
  category: string;
  /** Layout emphasis in the masonry grid. */
  span: "tall" | "wide" | "regular";
}

export const galleryImages: GalleryImage[] = [
  {
    src: "/images/gallery/tarta-1.webp",
    alt: "Dekorerad gräddtårta med bär.",
    category: "Tårtor",
    span: "tall",
  },
  {
    src: "/images/gallery/bakverk-1.webp",
    alt: "Nygräddade bakverk på fat.",
    category: "Bakverk",
    span: "regular",
  },
  {
    src: "/images/gallery/matbrod-1.webp",
    alt: "Nybakat matbröd med spröd skorpa.",
    category: "Matbröd",
    span: "wide",
  },
  {
    src: "/images/gallery/butiken-1.webp",
    alt: "Butiken på Edsbergs torg med välfyllda montrar.",
    category: "Butiken",
    span: "regular",
  },
  {
    src: "/images/gallery/smorgastarta-1.webp",
    alt: "Smörgåstårta dekorerad med grönsaker och räkor.",
    category: "Smörgåstårtor",
    span: "regular",
  },
  {
    src: "/images/gallery/bakom-1.webp",
    alt: "Bakom kulisserna i bageriet under morgonens bak.",
    category: "Bakom kulisserna",
    span: "tall",
  },
  {
    src: "/images/gallery/kaffebrod-1.webp",
    alt: "Kanelbullar och kaffebröd nygräddade.",
    category: "Bakverk",
    span: "wide",
  },
  {
    src: "/images/gallery/tarta-2.webp",
    alt: "Festtårta med tempererad choklad.",
    category: "Tårtor",
    span: "regular",
  },
  {
    src: "/images/gallery/butiken-2.webp",
    alt: "Fikahörna inne i bageriet.",
    category: "Butiken",
    span: "regular",
  },
  {
    src: "/images/gallery/matbrod-2.webp",
    alt: "Surdegsbröd på skärbräda.",
    category: "Matbröd",
    span: "regular",
  },
];
