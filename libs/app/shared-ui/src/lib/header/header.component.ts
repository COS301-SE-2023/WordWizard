import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'ww-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  @Input() title! : string;
  @Input() backRoute! : string;
  @Input() settingsActive! : boolean;
  @Input() settingsRoute! : string;
  backActive! : boolean;

  constructor(private router: Router) { }

  ngOnInit() {
    if(this.backRoute != ''){
      this.backActive = true;
    }else{
      this.backActive = false;
    }
  }

}
