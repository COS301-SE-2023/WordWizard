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
  div: any;


  constructor(private router: Router, private elRef:ElementRef ) {
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterViewInit() {
    this.div = this.elRef.nativeElement.querySelector('audio');
    this.div.volume = 0.03;
    console.log(this.div.volume);
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

  toggleBackgroundMusic() {
    // if (this.audioElement?.paused) {
    //   this.audioElement.play();
    // } else {
    //   this.audioElement.pause();
    // }
  }
}
