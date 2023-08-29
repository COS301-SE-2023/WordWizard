import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  volumeChangeSubject = new Subject<number>();
  volume!: number;

  volumeChange(volume: number) {
    this.volume = volume;
    this.volumeChangeSubject.next(volume);
  }

  getVolume() {
    return (this.volume * 100);
  }

}
