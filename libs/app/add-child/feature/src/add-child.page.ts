import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { AddChildService } from '@word-wizard/app/add-child/data-access';
import { AddChild } from '@word-wizard/app/child/data-access';
import { Store } from '@ngxs/store';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'ww-add-child',
  templateUrl: './add-child.page.html',
  styleUrls: ['./add-child.page.scss'],
})
export class AddChildPage {
  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    age: ['', Validators.required],
  });
  // Set visible to true to debug modal
  visible = false;
  selectedImage!: string;
  pictures: string[] = [];

  helpText: string[] = [];
  audioSources: string[] = ['assets/mp3/add-1.wav'];

  constructor(
    private readonly fb: FormBuilder,
    private auth: AuthService,
    private addChildService: AddChildService,
    public toastController: ToastController,
    private router: Router,
    private store: Store,
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
    this.auth.user$.subscribe((user) => {
      if (user) {
        this.store.dispatch(
          new AddChild({
            parentName: user.nickname || '',
            parentEmail: user.email || '',
            name: this.form.value.name,
            age: this.form.value.age,
            image: this.selectedImage,
          }),
        );
      } else {
        console.error('user is not logged in');
      }
    });
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
