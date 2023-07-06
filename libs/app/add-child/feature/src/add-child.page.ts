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

  // Remove, variable used for development
  devImage = 'https://img.freepik.com/free-vector/cute-shiba-inu-dog-wearing-dragon-costume-cartoon-vector-icon-illustration-animal-holiday-isolated_138676-7105.jpg?size=626&ext=jpg&ga=GA1.2.772846284.1688291417&semt=ais';
  devImage2 = 'https://img.freepik.com/free-vector/cute-young-dragon-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3544.jpg?size=626&ext=jpg&ga=GA1.2.772846284.1688291417&semt=ais';
  // Grab from state later
  pictures = [this.devImage, this.devImage2,this.devImage, this.devImage2,this.devImage, this.devImage2,this.devImage, this.devImage2,this.devImage ];
  constructor(private readonly fb: FormBuilder, private auth: AuthService, private addChildService: AddChildService, public toastController: ToastController) {}

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
