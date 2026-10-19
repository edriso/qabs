import { readFile, writeFile } from "node:fs/promises";
import { selections, surahNames, topics } from "./passages.mjs";

const source = await readFile(new URL("../data/quran-uthmani.txt", import.meta.url), "utf8");
const verses = new Map();

for (const line of source.split("\n")) {
  if (!line || line.startsWith("#")) continue;
  const [surah, ayah, ...text] = line.split("|");
  verses.set(`${surah}:${ayah}`, text.join("|"));
}

const passages = selections.map(([id, topic, title, surah, from, to]) => {
  const selected = [];
  for (let ayah = from; ayah <= to; ayah += 1) {
    const text = verses.get(`${surah}:${ayah}`);
    if (!text) throw new Error(`Missing source verse ${surah}:${ayah}`);
    selected.push({ number: ayah, text });
  }
  return { id, topic, title, surah, surahName: surahNames[surah], from, to, verses: selected };
});

const output = `${JSON.stringify({ notice: "Tanzil Quran Text, Uthmani 1.1, CC BY 3.0 — https://tanzil.net", topics, passages }, null, 2)}\n`;
await writeFile(new URL("../src/data/passages.json", import.meta.url), output);
console.log(
  `Wrote ${passages.length} passages with ${passages.reduce((sum, passage) => sum + passage.verses.length, 0)} ayat.`,
);
