import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { SpeakerService } from './speaker.service';

@Component({
  selector: 'ww-speaker',
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.scss'],
})
export class SpeakerComponent implements OnInit, OnChanges {
  @Input() speakPhrase!: string | null | undefined;
  @Input() definition!: string;
  audioUrl: string | null = null;
  constructor(private readonly speakerService: SpeakerService) {}

  async ngOnInit() {
    if (this.speakPhrase) {
      this.speakerService.getAudio(this.speakPhrase).subscribe((audioData) => {
        const blob = new Blob([audioData], { type: 'audio/mpeg' });
        const url = URL.createObjectURL(blob);
        this.audioUrl = url;
      });
    }
  }

  ngOnChanges() {
    if (this.speakPhrase) {
      this.speakerService.getAudio(this.speakPhrase).subscribe((audioData) => {
        const blob = new Blob([audioData], { type: 'audio/mpeg' });
        const url = URL.createObjectURL(blob);
        this.audioUrl = url;
      });
    }
  }

  speak() {
    if (this.audioUrl) {
      const audioElement = new Audio(this.audioUrl);
      audioElement.play();
    }
  }
}
