import { Component, Input } from '@angular/core';

@Component({
  selector: 'ww-speaker',
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.scss']
})
export class SpeakerComponent {
  @Input() speakPhrase!: string;
  @Input() definition!: string;

  speak(){
    if (this.speakPhrase) {
      this.textToSpeech(this.speakPhrase);
    }
    if (this.definition){
      setTimeout(() => this.textToSpeech(this.definition), 1000);
    }
  }

  textToSpeech(phrase: string) {
    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.volume = 0.9;
    utterance.lang = 'en-GB';
    speechSynthesis.speak(utterance);
  }

}
