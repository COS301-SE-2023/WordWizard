import { Component, HostListener, NgZone } from '@angular/core';
import { CoreService } from '@word-wizard/app/core/data-access';

@Component({
  selector: 'ww-core',
  templateUrl: './core.shell.html',
  styleUrls: ['./core.shell.scss'],
})
export class CoreShell {
  private clickSound!: HTMLAudioElement;
  private bgAudio!: HTMLAudioElement;
  private bgAudioHelper!: HTMLAudioElement;

  constructor(private coreService: CoreService, private ngZone: NgZone) {
    this.coreService.volumeChangeSubject.subscribe((volume) => {
      this.bgAudio.volume = volume;
      this.bgAudioHelper.volume = volume;
      //save volume in local storage
      // localStorage.setItem('volume', volume.toString());
    });

    this.clickSound = new Audio('assets/mp3/Haptic.mp3');
    this.bgAudio = new Audio('assets/mp3/LongAmbient.mp3');
    this.bgAudioHelper = new Audio('assets/mp3/AmbientHelper.mp3');
    this.bgAudio.loop = true;
    this.bgAudioHelper.loop = true;
    this.coreService.volumeChange(0.0);
    this.clickSound.volume = 0.085;

    const storedVolume = localStorage.getItem('volume');

    if (storedVolume != null) {
      coreService.volumeChange(parseFloat(storedVolume));
    }
    this.bgAudio.play();
    this.bgAudioHelper.play();
  }

  @HostListener('click') onClick() {
    this.clickSound.play();
  }
}
