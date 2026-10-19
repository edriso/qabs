// @vitest-environment node
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import data from "./passages.json";

const source = readFileSync(new URL("../../data/quran-uthmani.txt", import.meta.url), "utf8");
const expectedHash = readFileSync(new URL("../../data/SHA256", import.meta.url), "utf8").split(
  /\s+/,
)[0];
const sourceVerses = new Map(
  source
    .split("\n")
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => {
      const [surah, ayah, ...text] = line.split("|");
      return [`${surah}:${ayah}`, text.join("|")];
    }),
);

describe("curated Quran passages", () => {
  it("uses the pinned Quran source", () => {
    expect(createHash("sha256").update(source).digest("hex")).toBe(expectedHash);
  });

  it("matches the pinned Tanzil source byte for byte", () => {
    for (const passage of data.passages) {
      for (const verse of passage.verses) {
        expect(verse.text, `${passage.surah}:${verse.number}`).toBe(
          sourceVerses.get(`${passage.surah}:${verse.number}`),
        );
      }
    }
  });

  it("contains only complete contiguous ranges", () => {
    for (const passage of data.passages) {
      expect(passage.verses.map((verse) => verse.number)).toEqual(
        Array.from({ length: passage.to - passage.from + 1 }, (_, index) => passage.from + index),
      );
    }
  });

  it("has unique ids and a balanced topic index", () => {
    expect(new Set(data.passages.map((passage) => passage.id)).size).toBe(data.passages.length);
    for (const topic of data.topics) {
      expect(data.passages.filter((passage) => passage.topic === topic.id)).toHaveLength(4);
    }
  });
});
