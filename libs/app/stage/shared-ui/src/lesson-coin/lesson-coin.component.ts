import { Component, Input } from '@angular/core';

interface Coin {
  name: string;
  filledStars: number;
  leftPosition?: number;
}

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  filled: boolean;
}

@Component({
  selector: 'ww-lesson-coin',
  templateUrl: './lesson-coin.component.html',
  styleUrls: ['./lesson-coin.component.scss'],
})
export class LessonCoinComponent{

  @Input() coins: Array<Coin> = [{name: 'coin', filledStars: 0}, {name: 'coin', filledStars: 0}, {name: 'coin', filledStars: 0}, {name: 'coin', filledStars: 0}, {name: 'coin', filledStars: 0}];
  lines: Array<Line> = [];

  constructor() {

    this.coins.forEach((coin) => {
      coin.leftPosition = window.innerWidth - ((window.innerWidth/3)* (Math.floor(Math.random() * 3) + 1));
    });

  }

  ngAfterViewInit() {
    this.coins.forEach((coin, index) => {
      if(index < this.coins.length - 1)
      this.lines.push({
        x1: coin.leftPosition || 0,
        y1: document.getElementById(coin.name)?.getBoundingClientRect().y || 0,
        x2: this.coins[index+1].leftPosition || 0,
        y2:document.getElementById(this.coins[index+1].name)?.getBoundingClientRect().y || 0,
        filled: coin.filledStars>2
      });
    });
  }

}
