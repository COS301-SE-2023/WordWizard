import { Component, HostListener, OnInit, NgZone } from '@angular/core';
import { CoreService } from '@word-wizard/app/core/data-access';
import { App } from '@capacitor/app';
import { AuthService } from '@auth0/auth0-angular';
import { mergeMap } from 'rxjs/operators';
import { Browser } from '@capacitor/browser';
import { callbackUri } from './auth.config';

@Component({
  selector: 'ww-core',
  templateUrl: './core.shell.html',
  styleUrls: ['./core.shell.scss'],
})
export class CoreShell implements OnInit {

  private clickSound!: HTMLAudioElement;
  private bgAudio!: HTMLAudioElement;
  private bgAudioHelper!: HTMLAudioElement;

  ngOnInit(): void {
    App.addListener('appUrlOpen', ({ url }) => {
      this.ngZone.run(() => {
        if (url?.startsWith(callbackUri)) {
          if (
            url.includes('state=') &&
            (url.includes('error=') || url.includes('code='))
          ) {
            this.auth
              .handleRedirectCallback(url)
              .pipe(mergeMap(() => Browser.close()))
              .subscribe();
          } else {
            this.auth
              .handleRedirectCallback(url)
              .subscribe(() => {
                Browser.close();
              });
          }
        }
      });
    });
  }

  constructor(private coreService: CoreService, private auth: AuthService, private ngZone: NgZone) {



    this.coreService.volumeChangeSubject.subscribe(volume => {
      this.bgAudio.volume = volume;
      this.bgAudioHelper.volume = volume;
      //save volume in local storage
      localStorage.setItem('volume', volume.toString());
    });

    this.clickSound = new Audio('assets/mp3/Haptic.mp3');
    this.bgAudio = new Audio('assets/mp3/LongAmbient.mp3');
    this.bgAudioHelper = new Audio('assets/mp3/AmbientHelper.mp3');
    this.bgAudio.loop = true;
    this.bgAudioHelper.loop = true;
    this.coreService.volumeChange(0.06);
    this.clickSound.volume = 0.085;
    // this.bgAudio.play();
    // this.bgAudioHelper.play();

    const storedVolume = localStorage.getItem('volume');

    if(storedVolume!= null)
      this.bgAudio.volume = parseInt(storedVolume);
  }

  @HostListener('click') onClick() {
    // this.clickSound.play();
  }
}
