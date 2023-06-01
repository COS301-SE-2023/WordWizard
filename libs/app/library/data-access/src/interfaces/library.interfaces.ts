export interface Word {
    word: string;
    definition?: string;
    image?: string;
}

export interface WordList{
    words: Word[];
}