# Bildchecklista / Asset checklist

Lägg äkta, egna bilder från bageriet i `public/images/`. Använd **exakt** samma
filnamn som nedan – då dyker de upp automatiskt, utan att någon kod behöver
ändras. Tills en bild finns visas en snygg platshållare som håller layouten hel.

> **Ladda inte ner upphovsrättsskyddade bilder och hämta inte bilder från
> Facebook/Instagram.** Använd egna foton (gärna en mobil med bra ljus, eller en
> fotograf).

## Rekommenderat format

- **Filformat:** `.webp` (bäst) eller `.jpg`
- **Färg:** sRGB
- Fotografera i bra, naturligt ljus. Beskär inte bort viktiga detaljer.

## Bilder som behövs

| Filnamn | Motiv | Orientering | Min. mått | Alt-text (motiv) |
| --- | --- | --- | --- | --- |
| `public/images/hero-cakes.webp` | Dukat bord med tårtor/bakverk (startsidans huvudbild) | Stående 4:5 | 1200 × 1500 | Tårtor och bakverk |
| `public/images/cake-detail.webp` | Närbild på en dekorerad tårta | Kvadratisk 1:1 | 1200 × 1200 | Dekorerad tårta |
| `public/images/storefront.jpg` | Fasad/entré på Edsbergs torg (redan tillagd) | Liggande 4:3 | 1200 × 900 | Butiken på torget |
| `public/images/logo.jpg` | Logotypen (rund badge, redan tillagd) | Kvadratisk 1:1 | 512 × 512 | Lindas & Elinas logotyp |
| `public/images/interior.webp` | Interiör med montrar | Liggande 5:4 | 1400 × 1120 | Bageriets interiör |
| `public/images/bread.webp` | Nybakat matbröd | Liggande 4:3 | 1400 × 1050 | Matbröd |
| `public/images/pastries.webp` | Bakverk & kaffebröd i monter | Liggande 4:3 | 1400 × 1050 | Bakverk & kaffebröd |
| `public/images/sandwich-cake.webp` | Smörgåstårta | Liggande 4:3 | 1400 × 1050 | Smörgåstårta |
| `public/images/breakfast-lunch.webp` | Frukost/lunch/smörgås | Liggande 4:3 | 1400 × 1050 | Frukost & lunch |
| `public/images/team.webp` | Personal/bageriet (valfri) | Liggande 4:3 | 1400 × 1050 | Bageriet & personalen |
| `public/images/og-image.webp` | Delningsbild för sociala medier | Liggande 1.91:1 | 1200 × 630 | Lindas & Elinas |

## Galleri

Lägg 8–12 bilder i `public/images/gallery/`. Standardnamnen som används just nu
finns i `src/content/gallery.ts`:

| Filnamn | Kategori |
| --- | --- |
| `gallery/tarta-1.webp` | Tårtor |
| `gallery/tarta-2.webp` | Tårtor |
| `gallery/bakverk-1.webp` | Bakverk |
| `gallery/kaffebrod-1.webp` | Bakverk |
| `gallery/matbrod-1.webp` | Matbröd |
| `gallery/matbrod-2.webp` | Matbröd |
| `gallery/smorgastarta-1.webp` | Smörgåstårtor |
| `gallery/butiken-1.webp` | Butiken |
| `gallery/butiken-2.webp` | Butiken |
| `gallery/bakom-1.webp` | Bakom kulisserna |

Rekommenderad storlek: minst 1200 px på längsta sidan. Vill du lägga till fler
bilder eller ändra alt-texter – redigera `src/content/gallery.ts`.

## Byta en bild

1. Spara din bild med rätt filnamn i rätt mapp.
2. Klart! Ingen kod behöver ändras.

Vill du använda ett annat filnamn, ändra sökvägen i `src/content/site.ts`
(eller `src/content/gallery.ts` för galleriet).
