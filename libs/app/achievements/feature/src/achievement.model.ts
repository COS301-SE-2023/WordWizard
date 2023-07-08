export interface Award {
    goal: number;
    progress: number;
    description: string;
    completed: boolean;
    image: string;
}

export interface AwardSection {
    name: string;
    awards: Award[];
}
  