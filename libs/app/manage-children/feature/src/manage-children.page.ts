import { Component } from '@angular/core';

@Component({
  selector: 'word-wizard-manage-children',
  templateUrl: './manage-children.page.html',
  styleUrls: ['./manage-children.page.scss'],
})
export class ManageChildrenPage {
  children: { name: string, image: string }[] = [
    { name: "Alice", image: "https://img.freepik.com/free-vector/cute-dark-blue-baby-dragon-cartoon_96037-428.jpg?size=626&ext=jpg&ga=GA1.2.772846284.1688291417&semt=ais" },
    { name: "Bob", image: "https://img.freepik.com/free-vector/cute-dark-blue-baby-dragon-cartoon_96037-428.jpg?size=626&ext=jpg&ga=GA1.2.772846284.1688291417&semt=ais" },
    { name: "Charlie", image: "https://img.freepik.com/free-vector/cute-dark-blue-baby-dragon-cartoon_96037-428.jpg?size=626&ext=jpg&ga=GA1.2.772846284.1688291417&semt=ais" }
  ];
}
