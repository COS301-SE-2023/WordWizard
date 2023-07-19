export interface Word{
  word: string;
  imageURL: string;
  correct: boolean;
}

export interface Content {
  passage: Word[];
  focusWordsIndex: number[];
  done: boolean;
}

export interface Progress {
  level: number;
  content: Content;
  score: number;
  date: Date;
}
