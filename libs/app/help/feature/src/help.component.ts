import { Component } from '@angular/core';
import { HelpService } from '@word-wizard/app/help/data-access';


@Component({
  selector: 'ww-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class HelpComponent {

  messages: string[] = [];
  show = false;
  audioSources : string[] = [];
  currentMessage = 0;


  constructor(private helpService: HelpService) {
    helpService.help$.subscribe((help) => {
      this.currentMessage = 0;
      this.messages = help.text;
      this.show = help.show;
      this.audioSources = help.audioSources;
      this.playAudio();
    });
  }



  next(){
    this.currentMessage++;
    if(this.currentMessage >= this.messages.length){
      this.show = false;
      return;
    }
    this.playAudio();

  }


  playAudio() {
    const audio = new Audio(this.audioSources[this.currentMessage]);
    audio.play();
    audio.onended = () => {
      this.next();
    }
  }


}
