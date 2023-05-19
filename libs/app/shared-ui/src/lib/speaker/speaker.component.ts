import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-speaker',
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.scss']
})
export class SpeakerComponent {
  @Input() audioSrc!: string;

  playAudio(): void {
    const audio = new Audio(this.audioSrc);
    audio.play();
  }
}
