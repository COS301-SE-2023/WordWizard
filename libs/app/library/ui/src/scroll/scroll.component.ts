import { Component, Input } from '@angular/core';
import {
  Word,
} from '@word-wizard/app/library/data-access';

@Component({
  selector: 'ww-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.scss'],
})
export class ScrollComponent {
  @Input() vocab!: Word;
  @Input () number!: number;
}
