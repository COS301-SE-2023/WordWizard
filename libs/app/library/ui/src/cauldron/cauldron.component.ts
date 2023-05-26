import { Component, Input } from '@angular/core';

@Component({
  selector: 'ww-cauldron',
  templateUrl: './cauldron.component.html',
  styleUrls: ['./cauldron.component.scss']
})
export class CauldronComponent {

  @Input () vocab!: any;
  @Input () number!: number;

  bottleClass = "empty-bottle no-padding";
  isCorrect = false;

  textToSpeech(phrase: string, rate: number) {
    // speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(phrase);
    //Remove volume, this voice is apparently the loudest thing on earth
    utterance.rate = rate;
    utterance.volume = 0.9;
    utterance.lang = 'en-EU';
    speechSynthesis.speak(utterance);
  }

  test() {

    this.bottleClass = "full-bottle no-padding";
    this.isCorrect = true;

  }

  textFromMicrophone = '';

  handleTextChange(text: string) {
    this.textFromMicrophone = text;
    console.log('Text from microphone:', text);
    // Handle the text as needed
  }

}
