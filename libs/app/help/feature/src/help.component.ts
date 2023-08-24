import { Component, Input, ViewChild, ElementRef, OnChanges, SimpleChange } from '@angular/core';
import { HelpService } from '@word-wizard/app/help/data-access';

@Component({
  selector: 'ww-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class HelpComponent implements OnChanges {

  messages: string[] = [];
  show = false;
  audioSources : string[] = [];
  currentMessage = 0;

  constructor(private helpService: HelpService) {
    helpService.help$.subscribe((help) => {
      this.messages = help.text;
      this.show = help.show;
      this.audioSources = help.audioSources;
    });
  }

  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef<HTMLAudioElement>;

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    if(changes['audioSources'] || changes['messages']){
      this.setAudioSource(this.audioSources[0]);
      this.currentMessage = 0;
    }
  }

  next(){
    this.currentMessage++;
    this.setAudioSource(this.audioSources[this.currentMessage]);
    if(this.currentMessage >= this.messages.length){
      this.show = false;
      this.setAudioSource('');
    }

  }

  setAudioSource(audioSrc: string){
    this.audioPlayerRef.nativeElement.src = audioSrc;
    this.audioPlayerRef.nativeElement.load();
  }


  playAudio() {
    const audioPlayer = this.audioPlayerRef.nativeElement;
    audioPlayer.play();
  }


}
