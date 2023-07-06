import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { AddChildService } from '@word-wizard/app/add-child/data-access';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'ww-add-child',
  templateUrl: './add-child.page.html',
  styleUrls: ['./add-child.page.scss'],
})
export class AddChildPage {
  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    age: ['', Validators.required]
  });
  // Set visible to true to debug modal
  visible = false;
  selectedImage!: string;
  pictures: string[] = [];
  constructor(private readonly fb: FormBuilder, private auth: AuthService, private addChildService: AddChildService, public toastController: ToastController) {
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
      console.table(user);
      if (user) {
          this.addChildService.addChild(user.nickname || '', user.email || '', this.form.value.name, this.form.value.age, this.selectedImage).subscribe((res) => {
            if(res.status != 'success') {
              this.presentToast('Error adding child', 'danger');
              //redirect to manage children
            }
          });
      } else {
          console.error('user is not logged in');
      }
    });
  }

  async presentToast(text:string, color:string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000,
      color: color
    });
    toast.present();
  }
}
