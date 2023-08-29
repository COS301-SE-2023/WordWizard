import { Component, Input, EventEmitter, Output, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from '@word-wizard/app/core/data-access';

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
  audioLevel!: number;

  constructor(private router: Router, private coreService: CoreService) {
    this.audioLevel = coreService.getVolume();
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

    if (this.audioLevel === 6) {
      this.audioLevel = 3;
    } else if (this.audioLevel === 3) {
      this.audioLevel = 0;
    } else if (this.audioLevel === 0) {
      this.audioLevel = 6;
    }
    this.coreService.volumeChange((this.audioLevel / 100));

    console.log(this.audioLevel + " is the new level");
  }

}


