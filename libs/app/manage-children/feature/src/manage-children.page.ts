import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  GetChildren,
  SetChild,
  ChildState,
  ChildService,
  Child,
  ChangeActive,
  SetPassword,
} from '@word-wizard/app/child/data-access';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { LoadingService } from '@word-wizard/app/loading/data-access';
import { PasswordService } from '@word-wizard/app/password/data-access';

@Component({
  selector: 'word-wizard-manage-children',
  templateUrl: './manage-children.page.html',
  styleUrls: ['./manage-children.page.scss'],
})
export class ManageChildrenPage {
  @Select(ChildState.Children) Children$!: Observable<Child[]>;
  children: Child[] = [];
  visible = false;
  passwordSet = false;
  selectedChild!: Child;


  helpText: string[] = ['Welcome, press on the plus-button to add a child', 'You can sign out or delete your account, but be careful','If you want to read, navigate to your profile'];
  audioSources: string[] = ['assets/mp3/manage1.mp3', 'assets/mp3/manage2.mp3', 'assets/mp3/manage3.mp3'];

  parentActive = true;

  constructor(
    private router: Router,
    private store: Store,
    // private readonly auth: AuthService,
    private readonly childService: ChildService,
    private readonly toastController: ToastController,
    private readonly alertController: AlertController,
    private cookieService: CookieService,
    private loadingService: LoadingService,
    private passwordService: PasswordService,
  ) {
    loadingService.show();
    setTimeout(() => {

      // this.auth.idTokenClaims$.subscribe((claims) => {
      //   if (claims) {
      //     const idToken = claims.__raw;
      //     this.cookieService.set('authToken', idToken, undefined, undefined, undefined, true, 'Strict');
      //   }
      // });

      this.store.dispatch(
        new GetChildren({
          parent_email: this.cookieService.get('email') || '',
          parent_name: '',
        }),
      );
      this.Children$.subscribe((data) => {
        this.children = data;
      });

      this.passwordService.getPin(`${this.cookieService.get('email')}`).subscribe(
        (response) => {
          this.store.dispatch(new SetPassword({passcode: `${response}`}));
          console.log(response);
          if(`${response}` == '')
            this.router.navigate(['/password']);
        }
      );
      loadingService.hide();
    }, 2000);
  }

  setChild(child: Child) {
    this.selectedChild = child;
    this.store.dispatch(new SetChild({ childId: child._id }));
    this.controlModal();
  }

  controlModal() {
    this.visible = !this.visible;
  }

  logout() {
    try {
      this.cookieService.deleteAll();
      this.router.navigate(['/welcome']);
    } catch (error) {
      console.error(error);
    }
  }

  validate(val: boolean) {
    this.handle();
    this.setActive(val);
  }

  setActive(val: boolean) {
    this.parentActive = val;
    this.store.dispatch(new ChangeActive({ parentActive: val }));
    this.controlModal();
  }

  deleteAccount() {
    try {
      this.childService.deleteAuthAccount();
    } catch (error) {
      console.error(error);
      return;
    }
    this.childService.deleteAccount(this.cookieService.get('email') || '').subscribe((data) => {
      if (data.status === 'success') {
        this.router.navigate(['/welcome']);
      } else {
        this.presentToast();
      }
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Error occured when deleting account',
      duration: 2000,
      color: 'danger',
    });
    toast.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Delete Account',
      message: 'Are you sure you want to delete your account?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'OK',
          handler: () => {
            this.deleteAccount();
          },
        },
      ],
    });
    await alert.present();
  }

  handle() {
    this.passwordSet = !this.passwordSet;
  }

  correctPin() {
    this.passwordSet = false;
    if (this.parentActive) {
      this.router.navigate(['/view-child']);
    }
    else {
      this.router.navigate(['/dashboard']);
    }
  }
}
