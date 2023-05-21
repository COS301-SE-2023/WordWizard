import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-speaker',
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.scss']
})
export class SpeakerComponent {
  @Input() audioSrc!: string;
  @Input() phrase!: string;

  playAudio(): void {
    // const audio = new Audio(this.audioSrc);
    // audio.play();
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(this.phrase);
    //Remove volume, this voice is apparently the loudest thing on earth
    utterance.volume = 0.9;
    utterance.lang = 'en-EU';
    speechSynthesis.speak(utterance);
  }
}
