import { levelStats } from '../interfaces/child-statistics.interfaces';

export interface statistics {
    total_words: number;
    incorrect_words_by_level: number;
    average_score: number;
    highest_score: number;
    progress_history: levelStats[];
}

