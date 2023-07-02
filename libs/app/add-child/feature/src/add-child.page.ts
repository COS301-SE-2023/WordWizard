import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'word-wizard-add-child',
  templateUrl: './add-child.page.html',
  styleUrls: ['./add-child.page.scss'],
})
export class AddChildPage {
  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    age: ['', Validators.required],
  });
  visible = false;

  // Grab from state later
  pictures = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  constructor(private readonly fb: FormBuilder) {}

  controlModal() {
    this.visible = !this.visible;
  }
}
