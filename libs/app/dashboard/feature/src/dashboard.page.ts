import { Component } from '@angular/core';
import {
  ChildState,
  Child
} from '@word-wizard/app/child/data-access';
import {
  StageService,
  StageState,
} from '@word-wizard/app/stage/data-access'
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddChildService } from '@word-wizard/app/add-child/data-access';
import { ChildSettingsService } from '@word-wizard/app/child-settings/data-access';
import { levelsRequest } from '@word-wizard/app/stage/data-access';
import { getLevelsResponse } from '@word-wizard/app/stage/data-access';

@Component({
  selector: 'ww-dashboard',
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
  stage = 0;

  constructor(
    private store: Store,
    private readonly addChildService: AddChildService,
    private readonly childService: ChildSettingsService,
    private stageService: StageService
    ) {
    // Get the child's data
    this.currentChild$.subscribe((data) => {

      this.addChildService.getImages().subscribe((res) => {
        this.pictures = res.images;
      });

      if (data !==  undefined && data._id !== '') {
        console.log('Data exists:', data)
        this.child = data;

        // Get the progress id

        const rqst: levelsRequest = {
          progress_id: data._id
        }

        // Get the stage from the db
        this.stageService.getStage(rqst).subscribe((data : getLevelsResponse) => {
          this.stage = data.levels.findIndex((num) => num === 0) + 1;
        })

      }
    })

  }

  // pfp  = 'assets/img/item/cauldron-cropped.png';
  title = 'Journeyman';



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
