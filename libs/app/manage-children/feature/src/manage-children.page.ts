import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  GetChildren,
  SetChild,
  ChildState,
  ChildService,
  Child,
  ChangeActive,
  SetPassword,
  DeleteAccount
} from '@word-wizard/app/child/data-access';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { LoadingService } from '@word-wizard/app/loading/data-access';
import { PasswordService } from '@word-wizard/app/password/data-access';
import { HelpService } from '@word-wizard/app/help/data-access';

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
  showInitialHelp = false;
  helpSub: Subscription;


  helpText: string[] = ['Welcome, press on the plus-button to add a child', 'You can sign out or delete your account, but be careful','If you want to read, navigate to your profile'];
  audioSources: string[] = ['assets/mp3/manage1.mp3', 'assets/mp3/manage2.mp3', 'assets/mp3/manage3.mp3'];

  parentActive = true;

  constructor(
    private router: Router,
    private store: Store,
    private readonly childService: ChildService,
    private readonly toastController: ToastController,
    private readonly alertController: AlertController,
    private cookieService: CookieService,
    private loadingService: LoadingService,
    private passwordService: PasswordService,
    private route: ActivatedRoute,
    private helpService: HelpService
  ) {
    loadingService.show();
    setTimeout(() => {
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
        }
      );
      loadingService.hide();
    }, 2000);

    const routeSub = this.route.queryParams.subscribe(params => {
      if(params['first'])
        this.showInitialHelp =  params['first'].toLowerCase() === 'true' ? true : false;
      if(this.showInitialHelp) {
        helpService.show(['Welcome to WordWizard, I am wizzy and I will guide you along your journey', 'If you need help with anything press on the menu button on the top right of the screen and then press on the question mark'], ['assets/mp3/first1.mp3', 'assets/mp3/first2.mp3']);
        routeSub.unsubscribe();
      }

    });

    this.helpSub = helpService.help$.subscribe((help) => {

      if(help.show === false){
        this.showInitialHelp = false;
      }
      });
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
    this.childService.deleteAccount(this.cookieService.get('email')).subscribe((data) => {
      if (data.status === 'success') {
        this.router.navigate(['/welcome']);
        this.cookieService.deleteAll();
        this.store.dispatch(new DeleteAccount());
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
