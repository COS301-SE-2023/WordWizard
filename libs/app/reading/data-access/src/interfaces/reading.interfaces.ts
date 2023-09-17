export interface Word {
  word: string;
  imageURL: string;
  correct: boolean | null;
}

export interface Content {
  passage: Word[];
  focusWordsIndex: number[];
  done: boolean;
}

export interface Progress {
  level: number;
  content: Word[];
  score: number;
  date: string;
  incorrect_words: number;
}
