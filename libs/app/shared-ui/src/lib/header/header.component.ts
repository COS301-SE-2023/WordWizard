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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  HapticAudio: any;
  audioLevel!: number;
  audioLevelString!: string;



  constructor(private router: Router, private elRef:ElementRef ) {
    this.audioLevelString = "0.06";
    this.audioLevel = 6;
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterViewInit() {
    this.BGAudio = this.elRef.nativeElement.querySelector('#backgroundAudio');
    this.BGAudio.volume = this.audioLevelString;

    this.BGAudioHelper = this.elRef.nativeElement.querySelector('#backgroundAudioHELPER');
    this.BGAudioHelper.volume = this.audioLevelString;

    this.HapticAudio = this.elRef.nativeElement.querySelector('#HapticAudio');
    this.HapticAudio.volume = "0.1";
  }

  ngOnInit() {
    if (this.backRoute != '') {
      this.backActive = true;
    } else {
      this.backActive = false;
    }
  }

  fontChange() {
    this.settingsClick.emit();
  }


  playHaptic() {
    this.HapticAudio.play();
  }

  toggleBackgroundMusic() {
    console.log("TOGGLE LEVEL");
    if (this.audioLevel === 6) {
      this.audioLevelString = "0.03";
      this.audioLevel = 3;
      this.BGAudio.volume = this.audioLevelString;
      this.BGAudioHelper.volume = this.audioLevelString;
    } else if (this.audioLevel === 3) {
      this.audioLevelString = '0.00'; 
      this.audioLevel = 0;
      this.BGAudio.volume = this.audioLevelString;
      this.BGAudioHelper.volume = this.audioLevelString;
    } else if (this.audioLevel === 0) {
      this.audioLevelString = '0.06'; 
      this.audioLevel = 6;
      this.BGAudio.volume = this.audioLevelString;
      this.BGAudioHelper.volume = this.audioLevelString;
    }
    console.log(this.audioLevel + " is the new level");
  }
  
}


