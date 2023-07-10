import { Component } from '@angular/core';
import { 
  SetVocab,
  SetPractice,
  LibraryState,
  WordList,
} from '@word-wizard/app/library/data-access';
import {
  SetChild,
  ChildState,
  Child
} from '@word-wizard/app/child/data-access';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage {
  @Select(ChildState.currentChild) currentChild$!: Observable<Child>;

  child: any = {
    username: '',
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
  stage: number = 1;
  pfp : string = 'assets/img/item/cauldron-cropped.png';
}
