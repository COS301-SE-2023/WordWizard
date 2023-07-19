import { Progress } from "../interfaces/reading.interfaces";

export interface PassageRequest {
    level:number;
}

export interface UpdateProgressRequest {
    progress: Progress;
}
