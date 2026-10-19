import type { Topic } from "../data/types";

interface Props {
  topics: Topic[];
  active: string;
  onChange: (topic: string) => void;
}

export function TopicFilter({ topics, active, onChange }: Props) {
  return (
    <div className="topics" role="group" aria-label="تصفية المقاطع حسب الموضوع">
      <button className="topic" aria-pressed={active === "all"} onClick={() => onChange("all")}>
        الكل
      </button>
      {topics.map((topic) => (
        <button
          key={topic.id}
          className="topic"
          aria-pressed={active === topic.id}
          onClick={() => onChange(topic.id)}
        >
          {topic.label}
        </button>
      ))}
    </div>
  );
}
