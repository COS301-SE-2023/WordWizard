export interface stage{
  name: string;
  levels: [number,number,number,number,number]//array of each levels progress(out of 3), will always be 5 long
  background: string;
}

export interface stageRequest{
  userID: string;
}

export interface Coin {
  name: string;
  filledStars: number;
  leftPosition?: number;
}
