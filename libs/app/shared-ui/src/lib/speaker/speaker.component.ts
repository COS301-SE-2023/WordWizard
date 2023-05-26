import { Component, Input } from '@angular/core';

@Component({
  selector: 'ww-speaker',
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.scss']
})
export class SpeakerComponent {
  @Input() speakPhrase!: string;
  @Input() definition!: string;
  utterance!: SpeechSynthesisUtterance;

  async ngOnInit(){
    this.utterance = new SpeechSynthesisUtterance(this.speakPhrase);
    this.utterance.volume = 0.9;
    this.utterance.lang = 'en-GB';
  }

  ngOnChanges(){
    this.utterance = new SpeechSynthesisUtterance(this.speakPhrase);
    this.utterance.volume = 0.9;
    this.utterance.lang = 'en-GB';
  }

  speak() {
    speechSynthesis.speak(this.utterance);
  }

}
