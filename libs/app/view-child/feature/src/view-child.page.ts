import { Component } from '@angular/core';
import {
  SetChild,
  ChildState,
  Child
} from '@word-wizard/app/child/data-access';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'word-wizard-view-child',
  templateUrl: './view-child.page.html',
  styleUrls: ['./view-child.page.scss'],
})
export class ViewChildPage {
  @Select(ChildState.currentChild) currentChild$!: Observable<Child>;

  child: any = {
    username: 'Martie',
    pfp : 'assets/img/item/cauldron-cropped.png',
    stage: 0,
    title: 'Journeyman'
  };
  
  constructor(private store: Store) {
    this.currentChild$.subscribe((data) => {
      if (data.profile_photo != '')
      {
        this.child.pfp = data.profile_photo;
      }

      if (data.username != '')
      {
        this.child.username = data.username;
      }

      // Get the stage from the db
      // Set the child object's stage
    })
  }
  stage=  1;
  pfp = 'assets/img/item/cauldron-cropped.png';
  name = "Martie";
}
