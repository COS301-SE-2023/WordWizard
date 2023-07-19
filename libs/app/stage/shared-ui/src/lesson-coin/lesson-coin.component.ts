import { Component, Input, AfterViewInit, OnInit, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
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

  constructor( private router: Router, private elementRef: ElementRef) { }

  ngOnInit() {

    const windowWidth = (window.innerWidth > 600) ? 600 : window.innerWidth; ;
    const verticalOffset = window.innerHeight/7; //space between coins, since 5 coins on a page

    console.log(verticalOffset)

    this.coins.forEach((coin, index) => {
      coin.leftPosition = windowWidth - ((windowWidth/3)* (Math.floor(Math.random() * 3) + 1));
      coin.topPosition = verticalOffset * (index);
    });

    console.table(this.coins)

  }

   ngAfterViewInit() {

    setTimeout(() => {
    const element: HTMLElement = this.elementRef.nativeElement.querySelector('#level1');

    let widthOffset = element.offsetWidth;
    const heightOffset = element.offsetHeight;

     widthOffset = widthOffset/2;

    console.log(heightOffset);

    this.coins.forEach((coin, index) => {
      if(index < this.coins.length - 1){
        const x1= ((coin.leftPosition || 0) + widthOffset);
        const y1= ((coin.topPosition || 0) + (heightOffset*(index))) + (heightOffset/2) ;
        const x2= ((this.coins[index+1].leftPosition || 0) + widthOffset);
        const y2=  ((this.coins[index+1].topPosition || 0) + (heightOffset*(index+1))) + (heightOffset/2);
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

    console.table(this.lines)

    this.startAnimation();
  }, 1000);

  }

  startAnimation() {
    const lines = document.getElementsByClassName('line');
    let i = 0;
      const animate = setInterval(() => {
        const line = lines[i];
        i++;
        line.classList.add('line-animation');
        if(i === 19)clearInterval(animate);
      }, 1000);
  }

  goToReading(level : string){
    console.log(level);
    this.router.navigate(['/reading']);
  }


}
