import { Component, Input, EventEmitter, Output, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ww-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title!: string;
  @Input() backRoute!: string;
  @Input() settingsActive!: boolean;
  @Input() settingsRoute!: string;
  @Input() font!: boolean;
  @Output() settingsClick = new EventEmitter();
  backActive!: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  BGAudio: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  BGAudioHelper: any;
  audioActive!: boolean;


  constructor(private router: Router, private elRef:ElementRef ) {
    this.audioActive = true;
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterViewInit() {
    this.BGAudio = this.elRef.nativeElement.querySelector('#backgroundAudio');
    this.BGAudio.volume = 0.03;

    this.BGAudioHelper = this.elRef.nativeElement.querySelector('#backgroundAudioHELPER');
    this.BGAudioHelper.volume = 0.03;


    console.log(this.BGAudio);
    console.log(this.BGAudioHelper);

  }

  wait() {
    console.log("waiting 7 seconds to replay....");
      setTimeout(this.playSoundHelper, 7000);
  }

  playSoundHelper() {
      this.BGAudioHelper.play();
      this.BGAudioHelper.onended = function() {
        console.log("audio clip ended ");
        wait();
      }
  }


  ngOnInit() {

    this.playSoundHelper();


    if (this.backRoute != '') {
      this.backActive = true;
    } else {
      this.backActive = false;
    }
  }

  fontChange() {
    this.settingsClick.emit();
  }

  toggleBackgroundMusic() {
    // if (this.audioElement?.paused) {
    //   this.audioElement.play();
    // } else {
    //   this.audioElement.pause();
    // }
  }
}
function wait() {
  throw new Error('Function not implemented.');
}

