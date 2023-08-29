import { Component  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ww-user-agreement',
  templateUrl: './user-agreement.page.html',
  styleUrls: ['./user-agreement.page.scss'],
})
export class UserAgreementPage {
  agreement = `Click the button below to login/signup and start using the app
  lick the button below to login/signup and start using the app
  lick the button below to login/signup and start using the app
  lick the button below to login/signup and start using the app
  lick the button below to login/signup and start using the app
  lick the button below to login/signup and start using the app
  lick the button below to login/signup and start using the app

  lick the button below to login/signup and start using the app
  lick the button below to login/signup and start using the app
  lick the button below to login/signup and start using the app
  lick the button below to login/signup and start using the app
  lick the button below to login/signup and start using the app

  lick the button below to login/signup and start using the app
  lick the button below to login/signup and start using the app
  lick the button below to login/signup and start using the app
  lick the button below to login/signup and start using the app
  lick the button below to login/signup and start using the app`;

  constructor(private route: Router) {}

  accept() {
    this.route.navigate(['/manage-children']);
  }

  decline() {
    this.route.navigate(['/welcome']);
  }
}
