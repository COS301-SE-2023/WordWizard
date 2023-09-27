import { Progress } from '../interfaces/reading.interfaces';

export interface PassageRequest {
  id: string;
  level: number;
}

export interface UpdateProgressRequest {
  child_id: string;
  progress: Progress;
}
