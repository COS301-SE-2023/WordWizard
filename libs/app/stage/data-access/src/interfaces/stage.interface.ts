/* eslint-disable @angular-eslint/component-class-suffix */
export interface stage{
  levels: number[];//array of each levels progress(out of 3)
  selectedLevel: number;
}

export interface Coin {
  name: string;
  filledStars: number;
  leftPosition?: number;
  topPosition?: number;
}
