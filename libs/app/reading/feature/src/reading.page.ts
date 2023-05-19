import { Component } from '@angular/core';

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

  constructor() {
    // Set the image source based on the word
    this.imageSrc = `assets/img/${this.word}.png`;
  }

}