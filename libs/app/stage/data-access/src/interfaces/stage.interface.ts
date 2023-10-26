/* eslint-disable @angular-eslint/component-class-suffix */
export interface stage {
  levels: number[];
  selectedLevel: number;
}

export interface Coin {
  name: string;
  filledStars: number;
  leftPosition?: number;
}
