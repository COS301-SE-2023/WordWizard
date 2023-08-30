import { Component, Input, EventEmitter, Output, OnInit} from '@angular/core';
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

  //burgermenu inputs
  @Input () volumeChanger! : boolean;
  @Input () fontChanger! : boolean;
  @Input () help! : boolean;
  @Input () helpText!: string[];
  @Input () audioSources!: string[];
  @Input () audioLevel = 0;


  backActive!: boolean;

  constructor(private router: Router) {

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



}


