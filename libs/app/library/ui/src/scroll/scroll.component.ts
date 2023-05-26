import { Component, Input } from '@angular/core';

@Component({
  selector: 'ww-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.scss'],
})
export class ScrollComponent {
  @Input() vocab!: any;
  @Input () number!: number;

  textToSpeech(phrase: string, rate: number) {
    //speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(this.vocab.word + ' ' + this.vocab.definition);
    //Remove volume, this voice is apparently the loudest thing on earth
    utterance.rate = rate;
    utterance.volume = 0.9;
    utterance.lang = 'en-EU';
    speechSynthesis.speak(utterance);
  }

}
