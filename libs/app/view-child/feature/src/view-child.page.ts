import { Component } from '@angular/core';
import {
  SetChild,
  ChildState,
  Child
} from '@word-wizard/app/child/data-access';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { StageService, getLevelsResponse, levelsRequest } from '@word-wizard/app/stage/data-access';

@Component({
  selector: 'word-wizard-view-child',
  templateUrl: './view-child.page.html',
  styleUrls: ['./view-child.page.scss'],
})
export class ViewChildPage {
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

  stage = 0;

  constructor(private store: Store, private stageService: StageService) {
    this.currentChild$.subscribe((data) => {

      if (data !==  undefined && data._id !== '') {
        // console.log('Data exists:', data)
        this.child = data;


        // Create request
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

}
