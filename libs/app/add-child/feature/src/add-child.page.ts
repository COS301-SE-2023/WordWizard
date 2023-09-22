import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddChildService } from '@word-wizard/app/add-child/data-access';
import { AddChild } from '@word-wizard/app/child/data-access';
import { Store } from '@ngxs/store';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'ww-add-child',
  templateUrl: './add-child.page.html',
  styleUrls: ['./add-child.page.scss'],
})
export class AddChildPage {
  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    age: ['', Validators.required],
    acceptAgreement: [false, [Validators.required, this.mustBeTrueValidator]],
  });

  //eslint-disable-next-line
  mustBeTrueValidator(control:any) {
    const value = control.value;
    if (value !== true)
      return { mustBeTrue: true };
    return null;
  }
  visible = false;
  selectedImage!: string;
  pictures: string[] = [];

  helpText: string[] = ["Enter your child's name and age, Then proceed to, choose a profile picture, and press add."];
  audioSources: string[] = ['assets/mp3/addChild1.mp3', 'assets/mp3/addChild2.mp3'];

  constructor(
    private readonly fb: FormBuilder,
    private addChildService: AddChildService,
    public toastController: ToastController,
    private router: Router,
    private store: Store,
    private cookieService: CookieService,
  ) {
    this.addChildService.getImages().subscribe((res) => {
      this.pictures = res.images;
    });
  }

  controlModal() {
    this.visible = !this.visible;
  }

  chooseImage(image: string) {
    this.selectedImage = image;
  }

  submit() {
    this.store.dispatch(
      new AddChild({
        parentName: '',
        parentEmail: this.cookieService.get('email'),
        name: this.form.value.name,
        age: this.form.value.age,
        image: this.selectedImage,
      }),
    );
    this.router.navigate(['/manage-children']);
  }

  async presentToast(text: string, color: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000,
      color: color,
    });
    toast.present();
  }
}
