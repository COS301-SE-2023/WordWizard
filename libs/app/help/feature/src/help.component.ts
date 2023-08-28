import { Component, OnDestroy } from '@angular/core';
import { HelpService } from '@word-wizard/app/help/data-access';


@Component({
  selector: 'ww-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class HelpComponent implements OnDestroy{

  messages: string[] = [];
  show = false;
  audioSources : string[] = [];
  currentMessage = 0;
  audio!: HTMLAudioElement;


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
    this.audio.pause();
    this.show = false;
    this.currentMessage = 0;
  }


  next(){
    this.audio.pause();
    this.currentMessage++;
    if(this.currentMessage >= this.messages.length){
      this.show = false;
      return;
    }
    this.playAudio();

  }




  playAudio() {
    this.audio = new Audio(this.audioSources[this.currentMessage]);
    this.audio.play();
    this.audio.onended = () => {
      this.next();
    }
  }


}
