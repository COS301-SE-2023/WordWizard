import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChildSettingsService } from '@word-wizard/app/child-settings/data-access';
import { Router } from '@angular/router';
import { 
  SetChild,
  DeleteChild,
  ChildState,
  Child
} from '@word-wizard/app/child/data-access';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { AddChildService } from '@word-wizard/app/add-child/data-access';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'word-wizard-child-settings',
  templateUrl: './child-settings.page.html',
  styleUrls: ['./child-settings.page.scss'],
})
export class ChildSettingsPage {
  @Select(ChildState.Children) Children$!: Observable<Child[]>; 

  devImage = 'https://img.freepik.com/free-vector/cute-shiba-inu-dog-wearing-dragon-costume-cartoon-vector-icon-illustration-animal-holiday-isolated_138676-7105.jpg?size=626&ext=jpg&ga=GA1.2.772846284.1688291417&semt=ais';
  visible = false;
  form!: FormGroup;
  selectedImage!: string;
  pictures: string[] = [];
  @Select(ChildState.currentChild) currentChild$!: Observable<Child>;

  constructor(
    private readonly fb: FormBuilder, 
    private auth: AuthService, 
    private addChildService: AddChildService,  
    private childSettingsService: ChildSettingsService, 
    private store: Store,
    private alertController: AlertController,
    private router: Router
  ) {
    this.currentChild$.subscribe((data) => {
      if(data.profile_photo == '') 
        this.selectedImage  = this.devImage;
      else
        this.selectedImage = data.profile_photo;
      this.form = this.fb.group({
        name: [data.username, Validators.required],
        age: [data.age, Validators.required],
      });
    });
    this.addChildService.getImages().subscribe((res) => {
      this.pictures = res.images;
    });
  }

  submit() {

    this.currentChild$.subscribe((data) => {
      this.childSettingsService.editChild(data._id, this.form.value.name, this.form.value.age, this.selectedImage).subscribe((res) => {
        console.log(res);
      });
      this.store.dispatch(new SetChild({childId:data._id}));
    });
  }

  deleteProfile() {

    this.currentChild$.subscribe((data) => {
      this.childSettingsService.deleteChild(data._id).subscribe((res) => {
        console.log(res);
        this.store.dispatch(new DeleteChild({childId:data._id}));
        this.router.navigate(['/manage-children']);
      });
    });
  }

  modal() {
    this.visible = !this.visible;
  }

  chooseImage(image: string) {
    this.selectedImage = image;
  }

  async presentAlert() {
    let name = '';
    this.currentChild$.subscribe((data) => {
      name = data.username;
    });
    const alert = await this.alertController.create({
      header: 'Delete Profile',
      message: `Are you sure you want to delete ${name}'s profile?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'OK',
          handler: () => {
            this.deleteProfile();
          }
        }
      ]
    });
    await alert.present();
  }
}
