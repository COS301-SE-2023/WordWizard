import { Component, Input } from '@angular/core';

@Component({
  selector: 'ww-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.scss'],
})
export class ScrollComponent {
  @Input () word!: string;
  @Input () definition!: string;

  open = false;
  speak(){
    // speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(this.word + this.definition);
    //Remove volume, this voice is apparently the loudest thing on earth
    utterance.volume = 0.1;
    utterance.lang = 'en-EU';
    speechSynthesis.speak(utterance);
  }

}
