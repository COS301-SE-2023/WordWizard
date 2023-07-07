import { Component } from '@angular/core';

@Component({
  selector: 'word-wizard-view-child',
  templateUrl: './view-child.page.html',
  styleUrls: ['./view-child.page.scss'],
})
export class ViewChildPage {
  stage: number = 1;
  pfp : string = 'assets/img/item/cauldron-cropped.png';
  name: string = "Martie";
}
