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

  @Input() coins: Array<Coin> = [{name: 'coin1', filledStars: 2}, {name: 'coin2', filledStars: 3}, {name: 'coin3', filledStars: 3}, {name: 'coin4', filledStars: 0}, {name: 'coin5', filledStars: 0}];
  lines: Array<Line> = [];
  animateLine= false;

  constructor() {

    this.coins.forEach((coin) => {
      coin.leftPosition = window.innerWidth - ((window.innerWidth/3)* (Math.floor(Math.random() * 3) + 1));
    });

    console.log('com');

  }

  ngAfterViewInit() {
    console.log('after')

    let widthOffset = document.getElementById(this.coins[1].name)?.offsetWidth || 0;
    let heightOffset = document.getElementById(this.coins[1].name)?.clientHeight || 0;
    console.log(heightOffset)
    widthOffset = widthOffset/2;
    heightOffset = heightOffset/2;

    console.log('width:',widthOffset,'height', heightOffset);

    this.coins.forEach((coin, index) => {
      console.log(coin.leftPosition);
      if(index < this.coins.length - 1){
        this.lines.push({
          x1: (coin.leftPosition || 0) + widthOffset,
          y1: (document.getElementById(coin.name)?.getBoundingClientRect().y) || 0 + heightOffset,
          x2: ((this.coins[index+1].leftPosition || 0) + widthOffset),
          y2: (document.getElementById(this.coins[index+1].name)?.getBoundingClientRect().y) || 0 + heightOffset,
          filled: this.coins[index+1].filledStars>=2
        });
      }
    });

    this.startAnimation();
  }

  startAnimation() {
    this.animateLine = true;
  }

}
