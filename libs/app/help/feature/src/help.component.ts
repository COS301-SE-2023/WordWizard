import { Component, OnDestroy, EventEmitter, Output } from '@angular/core';
import { HelpService } from '@word-wizard/app/help/data-access';

@Component({
  selector: 'ww-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class HelpComponent implements OnDestroy {
  messages: string[] = [];
  show = false;
  audioSources: string[] = [];
  currentMessage = 0;
  audio!: HTMLAudioElement | null;

  @Output() closeHelp = new EventEmitter<void>();

  constructor(private helpService: HelpService) {
    helpService.help$.subscribe((help) => {
      this.currentMessage = 0;
      this.messages = help.text;
      this.show = help.show;
      this.audioSources = help.audioSources;
      this.playAudio();
    });
  }

  ngOnDestroy(): void {
    this.audio?.pause();
    this.audio?.load();
    this.audio = null;
    this.show = false;
    this.currentMessage = 0;
    this.closeHelp.emit();
  }

  next() {
    this.audio?.pause();
    this.currentMessage++;
    if (this.currentMessage >= this.messages.length) {
      this.show = false;
      this.audio = null;
      this.helpService.hide();
      this.closeHelp.emit();
      return;
    }
    this.playAudio();
  }

  playAudio() {
    if (this.audio) {
      this.audio.pause();
      this.audio.removeEventListener('ended', this.audioEndedHandler);
      this.audio = null;
    }

    this.audio = new Audio(this.audioSources[this.currentMessage]);
    this.audio.addEventListener('ended', this.audioEndedHandler);

    this.audio.load();
    this.audio.play();
  }

  audioEndedHandler = () => {
    this.next();
  };
}
