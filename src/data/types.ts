export interface Topic {
  id: string;
  label: string;
}

export interface Verse {
  number: number;
  text: string;
}

export interface Passage {
  id: string;
  topic: string;
  title: string;
  surah: number;
  surahName: string;
  from: number;
  to: number;
  verses: Verse[];
}

export interface PassageData {
  notice: string;
  topics: Topic[];
  passages: Passage[];
}
