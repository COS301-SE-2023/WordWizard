import { Component, Input } from '@angular/core';

@Component({
  selector: 'ww-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  @Input() title! : string;
  @Input() backRoute! : string;
  @Input() settingsActive! : boolean;
  backActive! : boolean;

  ngOnInit() {
    if(this.backRoute != ''){
      this.backActive = true;
    }else{
      this.backActive = false;
    }
  }

}
