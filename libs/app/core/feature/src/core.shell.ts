import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'ww-core',
  templateUrl: './core.shell.html',
  styleUrls: ['./core.shell.scss'],
})
export class CoreShell {

  private clickSound!: HTMLAudioElement;

  constructor() {

    this.clickSound = new Audio('assets/mp3/Haptic.mp3');
    this.clickSound.volume = 0.085;
  }

  @HostListener('click') onClick() {
    this.clickSound.play();
  }

}
