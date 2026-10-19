# AGENTS.md

Notes for anyone, human or AI, working on Qabs.

## What this app is

Qabs (`قَبَس`) is an Arabic-first collection of short, connected Quran
passages for prayer, memorisation and reflection. It is a static React app:
no server, database, account, analytics or runtime content API.

The reading order is: the Quran, its surah and range, the topic, then every
other control. Keep the interface small and quiet. Do not add streaks,
scores, feeds, recommendations or generic dashboard furniture.

## Commands

```sh
npm install
npm run dev
npm test
npm run lint
npm run format
npm run build
npm run preview
npm run prepare:passages
```

Before committing, run `npm test`, `npm run lint`, `npx oxfmt --check` and a
subpath build such as `VITE_BASE_PATH=/qabs/ npm run build`.

## Structure

```text
src/App.tsx                 application state, filtering, URLs and sharing
src/components/             reader, index, filters and inline icons
src/data/passages.json      generated Quran ranges; never hand-edit
src/data/passages.test.ts   byte-level and structural Quran checks
scripts/passages.mjs        curated topic and range manifest
scripts/prepare-passages.mjs generator from the pinned original
data/quran-uthmani.txt      immutable Tanzil Uthmani 1.1 source
data/SHA256                 checksum of that source
public/fonts/               redistributed OFL fonts and their licences
```

## Rules that must not be broken

**Never type or edit Quran text by hand.** Change only the numeric range in
`scripts/passages.mjs`, run `npm run prepare:passages`, and inspect the
generated passage. The generator must remain a pure selection: no Unicode
normalisation, substitutions, trimming inside a verse, or mark removal.

**Never alter the pinned source.** `data/quran-uthmani.txt` is the complete
Tanzil Uthmani 1.1 download. `data/SHA256` identifies it. The copyright block
inside it and the entry in NOTICE must travel with any redistribution.

**A passage is contiguous.** Do not combine disconnected ayat into one card.
Prefer short ranges whose meaning begins and closes coherently. A one-ayah
passage is permitted when the ayah itself is a complete, substantial unit.

**Nothing may assume the deployment path.** GitHub Pages serves a project
under a subpath. Public HTML paths use `%BASE_URL%`; code uses
`import.meta.env.BASE_URL`; Vite receives `VITE_BASE_PATH` from the Pages
workflow. Test a non-root build.

**Third-party material belongs in NOTICE.** Add the source, owner, licence and
local licence file in the same change. Repository-authored work remains 0BSD.

**Keep visitors private.** No analytics, remote storage, tracking pixels or
user data transmission. The saved colour theme stays in localStorage under
`qabs:theme`.

## Arabic and accessibility

- Visible product copy is Arabic; code and maintainer docs are English.
- The document is `dir="rtl"`. Do not fake RTL with visual reordering.
- User-facing numbers use Arabic-Indic digits through `src/data/arabic.ts`.
- Every control has an accessible name and a target of at least 44px when it
  is icon-only.
- Preserve keyboard focus styles, semantic buttons, native links and the
  `aria-live` status used by copy/share feedback.
- Passage changes must not scroll the document. The reader keeps a stable
  height; only its focusable verse region scrolls when a passage needs more
  room, and remounting that region resets it without moving the page.
- Keep `overflow-anchor: none` on `#root` in both the initial HTML and app
  CSS. Without it, the full-height loading mark can make a production page
  open part-way down when React replaces it.
- The selected topic uses `aria-pressed`; the selected passage uses
  `aria-current`.
- Motion must stop under `prefers-reduced-motion`.
- Keep the Quran as real Unicode text, selectable and available to assistive
  technology. Do not replace it with an image or private-use glyphs.

## Curation

Topic labels and passage titles are navigation, not tafsir. Prefer a short
phrase from the selected passage for its title and do not attach invented
claims, translations or explanations. When a new topic is introduced, add a
balanced set rather than one token entry and extend the data tests.
