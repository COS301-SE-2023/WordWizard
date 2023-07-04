import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'word-wizard-manage-children',
  templateUrl: './manage-children.page.html',
  styleUrls: ['./manage-children.page.scss'],
})
export class ManageChildrenPage {
  children: { name: string, image: string }[] = [
    { name: "Alice", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1suIDZd-BKm5JC-poxqX71715wnqg-vEjZg&usqp=CAU" },
    { name: "Sam", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvjz7CnoaOOAe4_a9paHa1sOpAMcuz4uuEug&usqp=CAU" },
    { name: "Charlie", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlYO8UfHBWeSbsGnh9Y4Lk0ZXG7fEWM6GnRA&usqp=CAU" }
  ];


  // Set visible to true to debug modal
  visible = false;
  selectedImage!: string;
  selectedChild: { name: string, image: string };


  constructor(private router: Router) {
    this.selectedChild = { name: "", image: "" };

  }

  setChild(child: { name: string, image: string }) {
    console.log("Selected child:", child);
    this.selectedChild = child;
    this.controlModal();
    // this.router.navigate(['library']); //chanfe to child statistics page
    // Add your logic here to handle the selection of a child
  }

  addNewChild() {
    console.log("Adding new child");
    // Add your logic here to handle adding a new child
  }

  controlModal() {
    this.visible = !this.visible;
  }

  chooseImage(image: string) {
    this.selectedImage = image;
  }
}