import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ww-progress-potion',
  templateUrl: './progress-potion.component.html',
  styleUrls: ['./progress-potion.component.scss'],
})
export class ProgressPotionComponent {
  @Input() percentage!: string;
  temp!: string;

  ngOnInit() {
    this.temp = this.percentage;
    this.percentage = '0%';
    setTimeout(() => {
      this.percentage = this.temp;
    }, 250);
  }
}
