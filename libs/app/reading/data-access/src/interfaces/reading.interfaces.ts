export interface Word{
  word: string;
  imageURL: string | null;
  correct: boolean | null;
}

export interface Content {
  passage: Word[];
  focusWordsIndex: number[];
}
