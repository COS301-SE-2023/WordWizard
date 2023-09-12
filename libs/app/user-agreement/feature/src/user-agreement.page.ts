import { Component  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ww-user-agreement',
  templateUrl: './user-agreement.page.html',
  styleUrls: ['./user-agreement.page.scss'],
})
export class UserAgreementPage {

  constructor(private route: Router) {}

  accept() {
    this.route.navigate(['/manage-children']);
  }

  decline() {
    this.route.navigate(['/welcome']);
  }
}
