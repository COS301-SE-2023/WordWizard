import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonModal } from '@ionic/angular';
import * as confetti from 'canvas-confetti';
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

  handleTextChange(text: string, modal: IonModal) {
    this.textFromMicrophone = text;
    const textArray = text.split(' ');
    textArray.forEach((word) => {
      if (word.toLocaleLowerCase() === this.vocab.word.toLocaleLowerCase()) {
        this,this.triggerConfetti();
        this.textChanged.emit(word);
        modal.dismiss();
      }
    });
  }

  triggerConfetti() {
    setTimeout(() => this.shoot(), 0);
    setTimeout(() => this.shoot(), 50);
    setTimeout(() => this.shoot(), 100);
  }

  shoot(): void {
    const config = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 20,
      shapes: ['star'],
      colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8'],
    };

    confetti.default({
      ...config,
      particleCount: 40,
      scalar: 1.2,
      shapes: ['star'],
    });

    confetti.default({
      ...config,
      particleCount: 10,
      scalar: 0.75,
      shapes: ['circle'],
    });
  }
}
