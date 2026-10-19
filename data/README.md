# Quran text provenance

The repository contains one immutable source file and one checksum:

- `quran-uthmani.txt`: Tanzil Quran Text, Uthmani, version 1.1.
- `SHA256`: the expected SHA-256 checksum for that exact file.

The source was downloaded from Tanzil with pause marks, sajdah signs,
rub-el-hizb signs, superscript alefs and tatweel enabled. This pinned copy was
originally retrieved on 2026-09-06 and is byte-identical to the copy used by
the Rattle project. Its SHA-256 is
`7f30c647331a61100ebf24a80507dc0fcdd9f2df97f1312b5b2dfcb982a7f326`.

Official download: <https://tanzil.net/download/>

Official terms: <https://tanzil.net/docs/Text_License>

## How passages are built

The curated ranges and their labels live in `scripts/passages.mjs`. Running
`npm run prepare:passages` reads the pinned source and writes
`src/data/passages.json`. It only splits the three pipe-delimited fields and
selects complete ayat by surah and ayah number. It performs no Unicode
normalisation, spelling change, mark removal or other transformation.

`src/data/passages.test.ts` opens the pinned source independently and compares
every displayed ayah byte for byte. It also checks that every passage is a
complete, contiguous range and that each topic has four entries.

Do not edit `quran-uthmani.txt` or `src/data/passages.json` by hand. Change a
range in the selection manifest, regenerate, inspect the result, and run the
full check suite.
