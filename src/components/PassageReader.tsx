import { arabic, reference, verseCount } from "../data/arabic";
import type { Passage, Topic } from "../data/types";
import { ChevronIcon, CopyIcon, ShareIcon, ShuffleIcon } from "./Icons";

interface Props {
  passage: Passage;
  topic: Topic;
  position: number;
  total: number;
  notice: string;
  status: string;
  onCopy: () => void;
  onShare: () => void;
  onRandom: () => void;
  onMove: (offset: number) => void;
}

export function PassageReader({
  passage,
  topic,
  position,
  total,
  notice,
  status,
  onCopy,
  onShare,
  onRandom,
  onMove,
}: Props) {
  return (
    <article className="reader" aria-labelledby="passage-title">
      <header className="reader-header" aria-live="polite">
        <div>
          <p className="eyebrow">{topic.label}</p>
          <h1 id="passage-title">{passage.title}</h1>
        </div>
        <p className="position">
          <span>{arabic(position + 1)}</span>
          <i aria-hidden="true" />
          {arabic(total)}
        </p>
      </header>

      <div
        className="verse-scroll"
        key={passage.id}
        tabIndex={0}
        aria-label={`نص مقطع ${passage.title}`}
      >
        <p className="verses" lang="ar">
          {passage.verses.map((verse) => (
            <span className="verse" key={verse.number}>
              {verse.text}{" "}
              <b aria-label={`الآية ${arabic(verse.number)}`}>﴿{arabic(verse.number)}﴾</b>{" "}
            </span>
          ))}
        </p>
      </div>

      <footer className="reader-footer">
        <div className="reference">
          <strong>سورة {passage.surahName}</strong>
          <span>
            {reference(passage.from, passage.to)} · {verseCount(passage.verses.length)}
          </span>
        </div>
        <div className="actions">
          <button className="text-action" onClick={onCopy}>
            <CopyIcon />
            <span>انسخ</span>
          </button>
          <button className="text-action" onClick={onShare}>
            <ShareIcon />
            <span>شارك</span>
          </button>
        </div>
      </footer>

      <div className="navigation">
        <button className="nav-button" onClick={() => onMove(-1)} aria-label="المقطع السابق">
          <ChevronIcon direction="previous" />
        </button>
        <button className="random-button" onClick={onRandom}>
          <ShuffleIcon />
          قبس آخر
        </button>
        <button className="nav-button" onClick={() => onMove(1)} aria-label="المقطع التالي">
          <ChevronIcon direction="next" />
        </button>
      </div>

      <output className="status" aria-live="polite">
        {status}
      </output>
      <p className="source-note">
        النص العثماني موثّق حرفيًّا من{" "}
        <a href="https://tanzil.net" target="_blank" rel="noreferrer">
          مشروع تنزيل
        </a>
        <span className="visually-hidden">. {notice}</span>
      </p>
    </article>
  );
}
