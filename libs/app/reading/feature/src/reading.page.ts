import { Component } from '@angular/core';
import { word } from './word.interface';

@Component({
  selector: 'reading',
  templateUrl: './reading.page.html',
  styleUrls: ['./reading.page.scss']
})
export class ReadingPage {
  backgroundImage = 'assets/img/CastleBackground.png';
  word = 'Magic';
  imageSrc: string;
  Level = 'Journeyman';
  Percentage = "0%";

  // textFromMicrophone!: string;
  currentWord = 0;

  textFromMicrophone: string[] = [];

  practice!: word[];

  constructor() {
    // Set the image source based on the word
    this.imageSrc = `assets/img/${this.word}.png`;

    //Grab sentence from backend?
    this.practice = [
      { word: 'Magic', correct: null },
      { word: 'Great', correct: null },
      { word: 'Wizard', correct: null },
    ]

  }

  getWordColor(w: word) {
    if(w.correct)
      return 'green';
    else if(w.correct === false)
      return 'red';
    return 'white';
  }

  handleTextChange(text: string) {
    this.textFromMicrophone.push(text);
    this.practice = this.practice.map((practiceWord) => {
      const foundWord = this.textFromMicrophone.find((outputWord) => outputWord.toLocaleUpperCase() === practiceWord.word.toLocaleUpperCase());
      return {
        ...practiceWord,
        correct: foundWord ? true : practiceWord.correct,
      };
    });

    const tp = this.practice.filter((w) => w.correct !== null).length/this.practice.length * 100;
    this.Percentage = `${tp.toFixed(0)}%`;
  }
}
