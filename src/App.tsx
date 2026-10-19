import { useMemo, useState } from "react";
import dataJson from "./data/passages.json";
import { arabic, reference } from "./data/arabic";
import type { Passage, PassageData } from "./data/types";
import { MoonIcon, SunIcon } from "./components/Icons";
import { PassageIndex } from "./components/PassageIndex";
import { PassageReader } from "./components/PassageReader";
import { TopicFilter } from "./components/TopicFilter";

const data = dataJson as PassageData;

function initialPassage(): string {
  const requested = new URLSearchParams(window.location.search).get("q");
  return data.passages.some((passage) => passage.id === requested)
    ? requested!
    : data.passages[0].id;
}

function initialTheme(): "light" | "dark" {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function passageText(passage: Passage): string {
  const verses = passage.verses.map((verse) => `${verse.text} ﴿${arabic(verse.number)}﴾`).join(" ");
  return `${verses}\n\nسورة ${passage.surahName} · ${reference(passage.from, passage.to)}\nقبس`;
}

export default function App() {
  const [topic, setTopic] = useState("all");
  const [activeId, setActiveId] = useState(initialPassage);
  const [theme, setTheme] = useState(initialTheme);
  const [status, setStatus] = useState("");

  const filtered = useMemo(
    () =>
      topic === "all" ? data.passages : data.passages.filter((passage) => passage.topic === topic),
    [topic],
  );
  const active = filtered.find((passage) => passage.id === activeId) ?? filtered[0];
  const position = filtered.findIndex((passage) => passage.id === active.id);
  const activeTopic = data.topics.find((item) => item.id === active.topic)!;

  function selectPassage(id: string) {
    setActiveId(id);
    setStatus("");
    const url = new URL(window.location.href);
    url.searchParams.set("q", id);
    window.history.replaceState({}, "", url);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function changeTopic(nextTopic: string) {
    setTopic(nextTopic);
    const next =
      nextTopic === "all"
        ? data.passages
        : data.passages.filter((passage) => passage.topic === nextTopic);
    if (!next.some((passage) => passage.id === activeId)) selectPassage(next[0].id);
  }

  function move(offset: number) {
    selectPassage(filtered[(position + offset + filtered.length) % filtered.length].id);
  }

  function randomPassage() {
    if (filtered.length === 1) return;
    const choices = filtered.filter((passage) => passage.id !== active.id);
    selectPassage(choices[Math.floor(Math.random() * choices.length)].id);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(passageText(active));
      setStatus("نُسخ المقطع");
    } catch {
      setStatus("تعذّر النسخ");
    }
  }

  async function share() {
    const shareData = { title: active.title, text: passageText(active), url: window.location.href };
    const nativeShare = Reflect.get(navigator, "share") as
      | ((data?: ShareData) => Promise<void>)
      | undefined;
    try {
      if (nativeShare) await nativeShare.call(navigator, shareData);
      else await navigator.clipboard.writeText(window.location.href);
      setStatus(nativeShare ? "تمّت المشاركة" : "نُسخ رابط المقطع");
    } catch (error) {
      if ((error as DOMException).name !== "AbortError") setStatus("تعذّرت المشاركة");
    }
  }

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", next === "dark" ? "#17201c" : "#f4f0e6");
    try {
      localStorage.setItem("qabs:theme", next);
    } catch {
      /* Appearance can remain session-only. */
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href={import.meta.env.BASE_URL} aria-label="قبس، الصفحة الرئيسية">
          <span>قَـبَـس</span>
          <small>آيات قصيرة، عظيمة المعنى</small>
        </a>
        <button
          className="theme-button"
          onClick={toggleTheme}
          aria-label={theme === "light" ? "استخدم الوضع الليلي" : "استخدم الوضع النهاري"}
        >
          {theme === "light" ? <MoonIcon /> : <SunIcon />}
        </button>
      </header>

      <main>
        <section className="intro" aria-labelledby="intro-title">
          <p className="kicker">مِنْ هَدْيِ القُرْآن</p>
          <p className="intro-title" id="intro-title">
            مقاطعٌ قصيرة مترابطة،
            <br />
            تقرأها في صلاتك وتحفظها بقلبك.
          </p>
        </section>

        <TopicFilter topics={data.topics} active={topic} onChange={changeTopic} />

        <div className="workspace">
          <PassageIndex passages={filtered} activeId={active.id} onSelect={selectPassage} />
          <PassageReader
            passage={active}
            topic={activeTopic}
            position={position}
            total={filtered.length}
            notice={data.notice}
            status={status}
            onCopy={copy}
            onShare={share}
            onRandom={randomPassage}
            onMove={move}
          />
        </div>
      </main>

      <footer className="site-footer">
        <p>قبسٌ من كتاب الله، بلا حساب ولا تتبّع.</p>
        <a href="https://github.com/edriso/qabs" target="_blank" rel="noreferrer">
          المصدر والترخيص
        </a>
      </footer>
    </div>
  );
}
