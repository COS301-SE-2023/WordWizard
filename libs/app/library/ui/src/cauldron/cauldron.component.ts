import { Component, Input } from '@angular/core';

@Component({
  selector: 'ww-cauldron',
  templateUrl: './cauldron.component.html',
  styleUrls: ['./cauldron.component.scss']
})
export class CauldronComponent {
  @Input () word!: string;
  @Input () definition!: string;
  @Input () number!: number;

  bottleClass = "empty-bottle no-padding";
  isCorrect = false;

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

  test() {
    if (true) {
      this.bottleClass = "full-bottle no-padding";
      this.isCorrect = true;
    }
  }

}
