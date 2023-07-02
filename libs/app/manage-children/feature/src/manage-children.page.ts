import { Component } from '@angular/core';


@Component({
  selector: 'word-wizard-manage-children',
  templateUrl: './manage-children.page.html',
  styleUrls: ['./manage-children.page.scss'],
})
export class ManageChildrenPage {
  children: { name: string, image: string }[] = [
    { name: "Alice", image: "https://img.freepik.com/free-vector/flat-baby-dinosaur-illustrated_23-2148951897.jpg?size=626&ext=jpg&ga=GA1.2.772846284.1688291417&semt=ais" },
    { name: "Bob", image: "https://img.freepik.com/free-vector/cute-shiba-inu-dog-wearing-dragon-costume-cartoon-vector-icon-illustration-animal-holiday-isolated_138676-7105.jpg?size=626&ext=jpg&ga=GA1.2.772846284.1688291417&semt=ais" },
    { name: "Charlie", image: "https://img.freepik.com/free-vector/cute-young-dragon-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3544.jpg?size=626&ext=jpg&ga=GA1.2.772846284.1688291417&semt=ais" }
  ];

  setChild(child: { name: string, image: string }) {
    console.log("Selected child:", child);
    // Add your logic here to handle the selection of a child
  }

  addNewChild() {
    console.log("Adding new child");
    // Add your logic here to handle adding a new child
  }
}