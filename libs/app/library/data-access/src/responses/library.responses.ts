import { WordList } from "../interfaces/library.interfaces";

export interface PracticeResponse {
    practiceList: WordList;
}

export interface VocabResponse {
    vocabList: WordList;
}

export interface UpdateResponse {
    status: string;
}