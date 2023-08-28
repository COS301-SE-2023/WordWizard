import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'ww-core',
  templateUrl: './core.shell.html',
  styleUrls: ['./core.shell.scss'],
})
export class CoreShell {

  private clickSound!: HTMLAudioElement;
  private bgAudio!: HTMLAudioElement;
  private bgAudioHelper!: HTMLAudioElement;

  constructor() {

    this.clickSound = new Audio('assets/mp3/Haptic.mp3');
    this.bgAudio = new Audio('assets/mp3/LongAmbient.mp3');
    this.bgAudioHelper = new Audio('assets/mp3/AmbientHelper.mp3');
    this.bgAudio.loop = true;
    this.bgAudioHelper.loop = true;
    this.bgAudio.volume = 0.06;
    this.bgAudioHelper.volume = 0.06;
    this.clickSound.volume = 0.085;

    this.bgAudio.play();
    this.bgAudioHelper.play();
  }

  @HostListener('click') onClick() {
    this.clickSound.play();
  }

}
