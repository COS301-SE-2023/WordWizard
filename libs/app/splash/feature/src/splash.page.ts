import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'word-wizard-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage {
  @Input() nextPage = 'welcome';
  constructor(private route: Router) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.route.navigate(['/'+ this.nextPage])
    }, 2000);
  }
}
