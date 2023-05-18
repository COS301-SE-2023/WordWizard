import { Component } from '@angular/core';

@Component({
  selector: 'word-wizard-microphone',
  templateUrl: './microphone.component.html',
  styleUrls: ['./microphone.component.scss'],
})
export class MicrophoneComponent {

  onClick() {
    console.log('Button clicked');
  }

  
}
