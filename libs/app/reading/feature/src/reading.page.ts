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
  backButton = 'assets/img/item/backbutton.png';

  visible = false;

  star1 = 'assets/img/item/greystar.png';
  star2 = 'assets/img/item/greystar.png';
  star3 = 'assets/img/item/greystar.png';
  wizardImg = 'assets/img/item/wizzy.png';
  congratularyMessage = 'Well Tried!';

  readingPageData = {
    word : '',
    imageSrc : '',
    level : 'Journeyman',
  }

  progressPercentage = '0%';
  progress = 0;
  increment!: number;
  textFromMicrophone: string[] = [];
  practice!: Content;
  currentWord = 0;
  sentence = "";

  constructor(private store: Store) {
    this.setStars();
    this.store.dispatch(new SetPassage());
    this.getCurrent$.subscribe((data) => {;
      this.currentWord = data;
    });
    this.readingState$.subscribe((data) => {
      this.practice = data;
      if(data.passage.filter(word => word.correct === null).length !== 0){
        this.progressPercentage = `${(data.passage.filter(word => word.correct !== null).length/(data.passage.length)) * 100}%`;
      }
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
    const words = text.split(" ");
    console.table(words);
    if(!this.practice.done) {
      if(words.includes(this.practice.passage[this.practice.focusWordsIndex[this.currentWord]].word.toLowerCase())){
        this.triggerConfetti();
        setTimeout(() => this.store.dispatch(new MakeAttempt({newAttempt: this.practice.passage[this.practice.focusWordsIndex[this.currentWord]].word.toLowerCase()})), 1000);
        // const count = this.practice.passage.filter((word) => word.correct !== null).length;
        // this.progress += (count+1)* this.increment;
        // this.progressPercentage = `${this.progress}%`;
        // this.increment = 100/this.practice.passage.length;
      }
    }
    else{
      this.practice.passage.every((word) => {
        if(words.includes(word.word.toLowerCase())){
          this.triggerConfetti();
          setTimeout(() => this.store.dispatch(new MakeAttempt({newAttempt: word.word.toLowerCase()})), 250);
        }
        return true;
      });
    }
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

  controlModal() {
    this.visible = !this.visible;
  }

  setStars(){  
    if (this.progressPercentage > '50%'){
      this.star1 = 'assets/img/item/goldstar.png';
      this.congratularyMessage = 'Well Done!';
    }
    if (this.progressPercentage > '75%'){
      this.star2 = 'assets/img/item/goldstar.png';
      this.congratularyMessage = 'Great Job!';
    }
    if (this.progressPercentage > '90%'){
      this.star3 = 'assets/img/item/goldstar.png';
      this.congratularyMessage = 'Amazing!';
    }
  }

  back(){
    console.log("back");
    //return back to levels page
  }
}
