import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  constructor(private readonly fb: FormBuilder) {}

  controlModal() {
    this.visible = !this.visible;
  }

  chooseImage(image: string) {
    this.selectedImage = image;
  }
}
