import { Component, Input } from '@angular/core';


@Component({
  selector: 'ww-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.scss'],
})
export class ScrollComponent {
  @Input () word!: string;
  @Input () definition!: string;
  @Input () number!: number;

  open = false;
  speak(){
    this.textToSpeech(this.word, 1);
    setTimeout(() => this.textToSpeech(this.definition, 1), 1000);
  }

  speakSlow(){
    this.textToSpeech(this.word, 0.35);
    setTimeout(() => this.textToSpeech(this.definition, 0.35), 1000);
  }

  textToSpeech(phrase: string, rate: number) {
    // speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(phrase);
    //Remove volume, this voice is apparently the loudest thing on earth
    utterance.rate = rate;
    utterance.volume = 0.9;
    utterance.lang = 'en-EU';
    speechSynthesis.speak(utterance);
  }

}
