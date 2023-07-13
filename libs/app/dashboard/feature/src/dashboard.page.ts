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
import { AddChildService } from '@word-wizard/app/add-child/data-access';
import { ChildSettingsService } from '@word-wizard/app/child-settings/data-access';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage {
  @Select(ChildState.currentChild) currentChild$!: Observable<Child>;

  child: Child = {
    _id: '0',
    username: 'Martie',
    age: 0,
    parent: '',
    vocab_list: '',
    practice_list: '',
    progress: '',
    profile_photo : 'assets/img/item/cauldron-cropped.png',
  };
  // child!: Child;
  visible = false;
  pictures: string[] = [];

  constructor(private store: Store, private readonly addChildService: AddChildService, private readonly childService: ChildSettingsService) {
    this.currentChild$.subscribe((data) => {
      // if (data.profile_photo != '')
      // {
      //   this.child.profile_photo = data.profile_photo;
      // }

      // if (data.username != '')
      // {
      //   this.child.username = data.username;
      // }

      this.addChildService.getImages().subscribe((res) => {
        this.pictures = res.images;
      });

      if (data) {

        this.child = data;
      }
      // Get the stage from the db
      // Set the child object's stage
    })
  }
  // pfp  = 'assets/img/item/cauldron-cropped.png';
  title = 'Journeyman';
  stage = 0;


  // CHILD SETTINGS CODE
  modal(){
    this.visible = !this.visible;
  } 

  chooseImage(i:string){
    this.child.profile_photo = i;
    this.visible = false;
    // (id:string, name: string, age: number, image: string
    this.childService.editChild(this.child._id, this.child.username, 8, i).subscribe((res) => {
      // console.log(res);
    });
  }
}
