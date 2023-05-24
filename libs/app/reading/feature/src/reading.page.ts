import { Component } from '@angular/core';
import { ReadingService } from '@word-wizard/app/reading/data-access';
import { ReadingRequest } from '@word-wizard/app/reading/data-access';

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
  Percentage = "55%";

  constructor(private readingService: ReadingService) {
    // Set the image source based on the word
    this.imageSrc = `assets/img/${this.word}.png`;

  }
}
