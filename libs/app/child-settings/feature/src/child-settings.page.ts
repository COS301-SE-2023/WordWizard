import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
export interface child {
  id: number;
  name: string;
  age: number;
  profilePicture: string;
}

@Component({
  selector: 'word-wizard-child-settings',
  templateUrl: './child-settings.page.html',
  styleUrls: ['./child-settings.page.scss'],
})
export class ChildSettingsPage {
  devImage = 'https://img.freepik.com/free-vector/cute-shiba-inu-dog-wearing-dragon-costume-cartoon-vector-icon-illustration-animal-holiday-isolated_138676-7105.jpg?size=626&ext=jpg&ga=GA1.2.772846284.1688291417&semt=ais';
  devImage2 = 'https://img.freepik.com/free-vector/cute-young-dragon-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3544.jpg?size=626&ext=jpg&ga=GA1.2.772846284.1688291417&semt=ais';
  visible = false;
  form: FormGroup= this.fb.group({
    name: ['', Validators.required],
    age: ['', Validators.required],
    stage: ['', Validators.required],
  });

  constructor(private readonly fb: FormBuilder) {}

  submit() {
    // console.log('submit');
  }

  deleteProfile() {
    // console.log('delete profile');
  }

  modal() {
    this.visible = !this.visible;
  }
}
