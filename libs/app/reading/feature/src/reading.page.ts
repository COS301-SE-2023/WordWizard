import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {
  ReadingStateModel,
  SetPassage,
  Content,
  Word
} from '@word-wizard/app/reading/data-access';
import { ReadingState } from '@word-wizard/app/reading/data-access';
import { Observable } from 'rxjs';

@Component({
  selector: 'reading',
  templateUrl: './reading.page.html',
  styleUrls: ['./reading.page.scss']
})
export class ReadingPage {

  @Select(ReadingState.getReadingState) readingState$!: Observable<Content>;

  backgroundImage = 'assets/img/CastleBackground.png';

  readingPageData = {
    word : '',
    imageSrc : '',
    level : 'Journeyman',
  }

  progressPercentage = '0%'

  // textFromMicrophone!: string;
  textFromMicrophone: string[] = [];
  practice!: Content;
  currentWord = 0;
  done = false;

  constructor(private store: Store) {
    // this.practice.passage = [
    //   { word: 'Magic', correct: null, imageURL: 'assets/img/Magic.png' },
    //   { word: 'Great', correct: null, imageURL: 'assets/img/Great.png' },
    //   { word: 'Wizard', correct: null, imageURL: 'assets/img/Wizard.png' },
    // ];
  }

  ngOnInit() {

    this.store.dispatch(new SetPassage());

    this.readingState$.subscribe((data) => {
      this.practice = data;
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
    this.textFromMicrophone.push(text);
    //Give child x attempts to allow for speech to text to fuck up


    // this.practice.passage = this.practice.passage.map((word: Word) => {
    //   if (this.textFromMicrophone.includes(word.word)) {
    //     return { ...word, correct: true };
    //   } else {
    //     return word;
    //   }
    // });

    // this.progressPercentage = `${(this.practice.passage.filter(word => word.correct !== null).length/this.practice.passage.length) * 100}%`;

  }
}
