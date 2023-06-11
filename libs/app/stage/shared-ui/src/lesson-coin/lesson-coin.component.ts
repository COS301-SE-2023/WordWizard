import { Component, Input } from '@angular/core';
import { Coin } from '@word-wizard/app/stage/data-access';

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  filled: boolean;
  length: number;
  animation: string;
}

@Component({
  selector: 'ww-lesson-coin',
  templateUrl: './lesson-coin.component.html',
  styleUrls: ['./lesson-coin.component.scss'],
})
export class LessonCoinComponent{

  @Input() coins: Array<Coin> = [{name: 'coin1', filledStars: 2}, {name: 'coin2', filledStars: 3}, {name: 'coin3', filledStars: 3}, {name: 'coin4', filledStars: 0}, {name: 'coin5', filledStars: 0}];
  lines: Array<Line> = [];

  constructor() {

    this.coins.forEach((coin) => {
      coin.leftPosition = window.innerWidth - ((window.innerWidth/3)* (Math.floor(Math.random() * 3) + 1));
    });


  }

  ngAfterViewInit() {

    let widthOffset = document.getElementById(this.coins[1].name)?.offsetWidth || 0;
    let heightOffset = document.getElementById(this.coins[1].name)?.offsetHeight || 0;
    console.log(widthOffset, heightOffset);
    widthOffset = widthOffset/2;
    heightOffset = heightOffset/2;


    this.coins.forEach((coin, index) => {
      console.log(coin.leftPosition);
      if(index < this.coins.length - 1){
        const x1= (coin.leftPosition || 0) + widthOffset;
        const y1= (document.getElementById(coin.name)?.getBoundingClientRect().y) || 0 - heightOffset;
        const x2= ((this.coins[index+1].leftPosition || 0) + widthOffset);
        const y2= (document.getElementById(this.coins[index+1].name)?.getBoundingClientRect().y) || 0 - heightOffset;
        const filled= this.coins[index+1].filledStars>=2;
        this.lines.push({
          x1 : x1,
          y1 : y1,
          x2 : x2,
          y2 : y2,
          filled: filled,
          length: Math.sqrt((x2-x1) ** 2 + (y2-y1) ** 2),
          animation: ''
        });
      }
    });

    this.startAnimation();

  }

  startAnimation() {
    const lines = document.getElementsByClassName('line');
    console.log(lines)
    let i = 0;
      const animate = setInterval(() => {
        const line = lines[i];
        i++;
        line.classList.add('line-animation');
        if(i === 4)clearInterval(animate);
      }, 1000);
  }

}
