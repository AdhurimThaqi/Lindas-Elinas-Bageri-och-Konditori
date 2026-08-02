# Innehållsguide för webbplatsen

Den här guiden är för dig som driver bageriet och vill hålla webbplatsen aktuell
– **utan att behöva vara programmerare**. Nästan allt innehåll finns i en enda
fil:

```
src/content/site.ts
```

Öppna filen i valfri textredigerare (eller direkt i GitHub). Leta upp avsnittet
du vill ändra, ändra texten mellan citattecknen `"..."`, spara och publicera. Var
noga med att behålla citattecken och kommatecken.

> Tips: Ändra en sak i taget. Om något ser konstigt ut efter publicering, ångra
> din senaste ändring.

---

## 1. Öppettider

Leta upp `openingHoursSummary` (raderna som visas i tabeller) och `openingHours`
(styr texten "Öppet nu"). Ändra tiderna i formatet `TT:MM`.

```ts
export const openingHoursSummary = [
  { label: "Måndag–Fredag", value: "06:00–18:00" },
  { label: "Lördag", value: "08:00–16:00" },
  { label: "Söndag", value: "08:00–16:00" },
];
```

En dag utan öppettider (stängt) anges med tom lista i `openingHours`, t.ex.
`sun: []`.

## 2. Avvikande öppettider (helgdagar)

Fyll i `specialHours` för enskilda datum. Exempel:

```ts
export const specialHours = [
  { date: "2026-12-24", label: "Julafton", intervals: [{ open: "08:00", close: "13:00" }] },
  { date: "2026-12-25", label: "Juldagen", intervals: [] }, // stängt hela dagen
];
```

Datumformat är `ÅÅÅÅ-MM-DD`. "Öppet nu"-texten och tabellerna uppdateras
automatiskt. Ta bort gamla datum när de passerat.

## 3. Toppbanner (announcement)

Den smala raden högst upp. Byt budskap eller stäng av den:

```ts
export const announcement = {
  enabled: true, // sätt till false för att dölja
  message: "Just nu: Semmelsäsong",
  link: { label: "", href: "" }, // valfri länk
};
```

Bra exempel: `"Nybakat från kl. 06 på vardagar"`, `"Beställ tårta till studenten"`,
`"Just nu: Semmelsäsong"`.

## 4. Säsongskampanj (t.ex. semlor, student, jul)

Leta upp `seasonalCampaign`. Sätt `enabled: true` och fyll i texterna:

```ts
export const seasonalCampaign = {
  enabled: true,
  eyebrow: "Just nu i bageriet",
  title: "Semmelsäsong",
  description: "Klassiska semlor bakade på plats.",
  dateRange: "Januari–mars",
  badge: "Säsong",
  image: "/images/pastries.webp",
  imageAlt: "Nybakade semlor.",
  cta: { label: "Se vårt utbud", href: "/sortiment" },
};
```

Sätt `enabled: false` när kampanjen är slut – då visas istället en text om
tårtor på beställning.

## 5. Omdömen / recensioner

Lägg **bara till riktiga omdömen** i `reviews`:

```ts
export const reviews = [
  { quote: "Bästa fikat i Edsberg!", author: "Förnamn E.", source: "Google" },
];
```

Om listan är tom visas en snygg sammanfattning med länkar till Google och
Tripadvisor istället – helt utan påhittade citat. Betyg och antal omdömen ändras
i `socialProof` (lämna `null` tills de är verifierade).

## 6. Kontaktuppgifter

Telefon, e-post och adress finns i `business`-avsnittet. Ändra på ett ställe – de
uppdateras överallt på sidan.

## 7. Bilder

Se `ASSET_CHECKLIST.md`. Kort version: lägg din bild i `public/images/` med rätt
filnamn, så byts platshållaren ut automatiskt.

## 8. Vanliga frågor (FAQ)

Redigera `faq`-listan. Dessa visas på sidorna Kontakt och Beställ och används även
för Googles sökresultat.

## 9. Externa länkar

`externalLinks` innehåller länkar till vägbeskrivning, Google, Tripadvisor och
Too Good To Go. `social` innehåller Facebook och Instagram.

---

### Behöver du hjälp?

Ändringar i den här filen räcker för det mesta. För större ändringar (nya sidor,
ny design, formulärleverans) – kontakta din webbutvecklare. Se `README.md` för
teknisk information.
