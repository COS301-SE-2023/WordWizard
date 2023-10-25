import {
  Component,
  Input,
  OnInit,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';

import { Coin } from '@word-wizard/app/stage/data-access';

@Component({
  selector: 'ww-lesson-coin',
  templateUrl: './lesson-coin.component.html',
  styleUrls: ['./lesson-coin.component.scss'],
})
export class LessonCoinComponent implements OnInit {
  @Output() coinClicked = new EventEmitter<string>();

  @Input() coins: Array<Coin> = [];

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    const windowWidth = window.innerWidth > 600 ? 600 : window.innerWidth;

    this.coins.forEach((coin) => {
      coin.leftPosition =
        windowWidth - (windowWidth / 3) * (Math.floor(Math.random() * 3) + 1);
    });

  }


  goToReading(level: string) {
    this.coinClicked.emit(level);
  }
}
