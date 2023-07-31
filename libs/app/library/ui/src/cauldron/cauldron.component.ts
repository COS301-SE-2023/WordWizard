import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Word } from '@word-wizard/app/library/data-access';

@Component({
  selector: 'ww-cauldron',
  templateUrl: './cauldron.component.html',
  styleUrls: ['./cauldron.component.scss'],
})
export class CauldronComponent {
  @Input() vocab!: Word;
  @Input() number!: number;
  @Output() textChanged: EventEmitter<string> = new EventEmitter<string>();
  textFromMicrophone = '';
  bottleClass = 'empty-bottle no-padding';
  isCorrect = false;

  handleTextChange(text: string) {
    this.textFromMicrophone = text;
    if (text.toLocaleLowerCase() === this.vocab.word.toLocaleLowerCase())
      this.textChanged.emit(text);
  }
}
