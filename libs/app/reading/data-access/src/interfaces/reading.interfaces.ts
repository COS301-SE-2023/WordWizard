export interface FocusWord{
  word: string;
  imageURL: string;
}

export interface Passage {
  passage: string;
  focusWords: FocusWord[];
}
