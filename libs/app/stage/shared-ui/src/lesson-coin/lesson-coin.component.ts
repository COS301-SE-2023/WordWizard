import { Component, Input, AfterViewInit, OnInit } from '@angular/core';
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
export class LessonCoinComponent implements AfterViewInit, OnInit{

  @Input() coins: Array<Coin> = [];
  lines: Array<Line> = [];

  ngOnInit() {

    const windowWidth = (window.innerWidth > 600) ? 600 : window.innerWidth; ;
    const verticalOffset = window.innerHeight/5; //space between coins, since 5 coins on a page

    this.coins.forEach((coin, index) => {
      coin.leftPosition = windowWidth - ((windowWidth/3)* (Math.floor(Math.random() * 3) + 1));
      coin.topPosition = verticalOffset * (index);
    });

  }

   ngAfterViewInit() {

    let widthOffset = document.getElementById(this.coins[1].name)?.offsetWidth || 0;
    let heightOffset = document.getElementById(this.coins[1].name)?.offsetHeight || 0;



    widthOffset = widthOffset/2;
    heightOffset = heightOffset/2;


    this.coins.forEach((coin, index) => {
      if(index < this.coins.length - 1){
        const x1= (coin.leftPosition || 0) + widthOffset;
        const y1= (coin.topPosition || 0) + heightOffset ;
        const x2= ((this.coins[index+1].leftPosition || 0) + widthOffset);
        const y2=  (this.coins[index+1].topPosition || 0) + heightOffset;
        const filled= (this.coins[index+1].filledStars)>=2;
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
    let i = 0;
      const animate = setInterval(() => {
        const line = lines[i];
        i++;
        line.classList.add('line-animation');
        if(i === 20)clearInterval(animate);
      }, 1000);
  }


}
