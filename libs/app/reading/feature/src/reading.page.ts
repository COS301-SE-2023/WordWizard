import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {
  // ReadingStateModel,
  SetPassage,
  MakeAttempt,
  Content,
  Word
} from '@word-wizard/app/reading/data-access';
import { ReadingState } from '@word-wizard/app/reading/data-access';
import { Observable } from 'rxjs';
import * as confetti from 'canvas-confetti';

@Component({
  selector: 'ww-reading',
  templateUrl: './reading.page.html',
  styleUrls: ['./reading.page.scss']
})
export class ReadingPage {

  @Select(ReadingState.getReadingState) readingState$!: Observable<Content>;
  @Select(ReadingState.getCurrent) getCurrent$!: Observable<number>;

  backgroundImage = 'assets/img/CastleBackground.png';

  readingPageData = {
    word : '',
    imageSrc : '',
    level : 'Journeyman',
  }

  progressPercentage = '0%';
  textFromMicrophone: string[] = [];
  practice!: Content;
  currentWord = 0;
  sentence = "";

  constructor(private store: Store) {
    this.store.dispatch(new SetPassage());
    this.getCurrent$.subscribe((data) => {;
      this.currentWord = data;
    });
    this.readingState$.subscribe((data) => {
      this.practice = data;
      if(data.passage.filter(word => word.correct === null).length !== 0)
        this.progressPercentage = `${(data.passage.filter(word => word.correct !== null).length/(data.passage.length)) * 100}%`;
      if(data.done)
        this.sentence = data.passage.map((word) => word.word).join(" ");
    });
  }

  getWordColor(w: Word | null | undefined) {
    if(w){
      if(w.correct)
        return 'green';
      else if(w.correct === false)
        return 'red';
    }
    return 'white';
  }

  handleTextChange(text: string) {
    if(!this.practice.done) {
      if(text.toLocaleLowerCase() == this.practice.passage[this.practice.focusWordsIndex[this.currentWord]].word.toLocaleLowerCase()) {
        this.triggerConfetti();
        setTimeout(() => this.store.dispatch(new MakeAttempt({newAttempt: text})), 1000);
      }
      else 
        this.store.dispatch(new MakeAttempt({newAttempt: text}));
    }
    else
      this.store.dispatch(new MakeAttempt({newAttempt: text}));

  }

  triggerConfetti() {
    setTimeout(() => 
      this.shoot()
      ,0
    );
    setTimeout(() => 
      this.shoot()
      ,50
    );
    setTimeout(() => 
      this.shoot()
      ,100
    );
  }

  shoot() : void{
    const config = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 20,
      shapes: ['star'],
      colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
    };
  
    confetti.default({
      ...config,
      particleCount: 40,
      scalar: 1.2,
      shapes: ['star']
    });
  
    confetti.default({
      ...config,
      particleCount: 10,
      scalar: 0.75,
      shapes: ['circle']
    });
  }
}
