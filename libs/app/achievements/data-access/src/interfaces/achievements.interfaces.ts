export interface Award {
  goal: number;
  progress: number;
  description: string;
  completed: boolean;
  img: string;
}

export interface AwardSection {
  name: string;
  awards: Award[];
}
