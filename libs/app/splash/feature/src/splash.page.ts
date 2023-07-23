import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'word-wizard-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage {
  constructor(private route: Router) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.route.navigate(['/welcome'])
    }, 2000);
  }
}
