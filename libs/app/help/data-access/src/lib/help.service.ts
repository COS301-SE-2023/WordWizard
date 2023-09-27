import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Help } from './interfaces/help.interface';

@Injectable({
  providedIn: 'root',
})
export class HelpService {
  private helpSubject = new BehaviorSubject<Help>({
    show: false,
    text: [],
    audioSources: [],
  } as Help);
  public help$ = this.helpSubject.asObservable();

  show(text: string[], audioSources: string[]) {
    this.helpSubject.next({
      show: true,
      text: text,
      audioSources: audioSources,
    } as Help);
  }

  hide() {
    this.helpSubject.next({ show: false, text: [], audioSources: [] } as Help);
  }
}
