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
    src: "/images/gallery/personal-tarta-1.svg",
    alt: "Medarbetare håller upp en nydekorerad festtårta i bageriet.",
    category: "Vårt team",
    span: "tall",
  },
  {
    src: "/images/gallery/personal-tarta-2.svg",
    alt: "Konditor visar stolt upp en gräddtårta med bär.",
    category: "Vårt team",
    span: "wide",
  },
  {
    src: "/images/gallery/tarta-1.svg",
    alt: "Dekorerad gräddtårta med bär.",
    category: "Tårtor",
    span: "regular",
  },
  {
    src: "/images/gallery/personal-tarta-3.svg",
    alt: "Personal med en tårta bakom disken på Edsbergs torg.",
    category: "Vårt team",
    span: "regular",
  },
  {
    src: "/images/gallery/bakverk-1.svg",
    alt: "Nygräddade bakverk på fat.",
    category: "Bakverk",
    span: "regular",
  },
  {
    src: "/images/gallery/matbrod-1.svg",
    alt: "Nybakat matbröd med spröd skorpa.",
    category: "Matbröd",
    span: "wide",
  },
  {
    src: "/images/gallery/butiken-1.svg",
    alt: "Butiken på Edsbergs torg med välfyllda montrar.",
    category: "Butiken",
    span: "regular",
  },
  {
    src: "/images/gallery/smorgastarta-1.svg",
    alt: "Smörgåstårta dekorerad med grönsaker och räkor.",
    category: "Smörgåstårtor",
    span: "regular",
  },
  {
    src: "/images/gallery/bakom-1.svg",
    alt: "Bakom kulisserna i bageriet under morgonens bak.",
    category: "Bakom kulisserna",
    span: "tall",
  },
  {
    src: "/images/gallery/kaffebrod-1.svg",
    alt: "Kanelbullar och kaffebröd nygräddade.",
    category: "Bakverk",
    span: "wide",
  },
  {
    src: "/images/gallery/tarta-2.svg",
    alt: "Festtårta med tempererad choklad.",
    category: "Tårtor",
    span: "regular",
  },
  {
    src: "/images/gallery/butiken-2.svg",
    alt: "Fikahörna inne i bageriet.",
    category: "Butiken",
    span: "regular",
  },
  {
    src: "/images/gallery/matbrod-2.svg",
    alt: "Surdegsbröd på skärbräda.",
    category: "Matbröd",
    span: "regular",
  },
];
