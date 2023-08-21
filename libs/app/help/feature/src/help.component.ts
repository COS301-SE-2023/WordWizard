import { Component, Input } from '@angular/core';

@Component({
  selector: 'ww-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class HelpComponent {

  @Input() messages: string[] = [];
  @Input() show = false;
  @Input() audioRoutes : string[] = [];
  currentMessage = 0;


  next(){
    this.currentMessage++;
    if(this.currentMessage >= this.messages.length){
      this.show = false;
    }

  }

}
