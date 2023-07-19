/* eslint-disable @angular-eslint/component-class-suffix */
export interface stage{
  name: string;
  levels: number[];//array of each levels progress(out of 3)
  background: string;
  selectedLevel: number;
}

export interface stageRequest{
  userID: string;
}

export interface Coin {
  name: string;
  filledStars: number;
  leftPosition?: number;
  topPosition?: number;
}
