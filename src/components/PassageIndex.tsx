import { reference } from "../data/arabic";
import type { Passage } from "../data/types";

interface Props {
  passages: Passage[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function PassageIndex({ passages, activeId, onSelect }: Props) {
  return (
    <nav className="passage-index" aria-label="مقاطع الموضوع">
      {passages.map((passage) => (
        <button
          key={passage.id}
          className="index-item"
          aria-current={activeId === passage.id ? "true" : undefined}
          onClick={() => onSelect(passage.id)}
        >
          <span>{passage.title}</span>
          <small>
            سورة {passage.surahName} · {reference(passage.from, passage.to)}
          </small>
        </button>
      ))}
    </nav>
  );
}
