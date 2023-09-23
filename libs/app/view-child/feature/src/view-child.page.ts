import { Component } from '@angular/core';
import {
  SetChild,
  ChildState,
  Child,
} from '@word-wizard/app/child/data-access';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  StageService,
  getLevelsResponse,
  levelsRequest,
} from '@word-wizard/app/stage/data-access';

@Component({
  selector: 'word-wizard-view-child',
  templateUrl: './view-child.page.html',
  styleUrls: ['./view-child.page.scss'],
})
export class ViewChildPage {
  @Select(ChildState.currentChild) currentChild$!: Observable<Child>;

  child: Child = {
    _id: '0',
    username: '',
    age: 0,
    parent: '',
    vocab_list: '',
    practice_list: '',
    progress: '',
    profile_photo: '',
  };

  stage = 0;

  helpText: string[] = ['Here you can navigate to the selected child\'s profile, achievements, progress and settings.'];
  audioSources: string[] = ['assets/mp3/view-child1.mp3'];

  constructor(private store: Store, private stageService: StageService) {
    this.currentChild$.subscribe((data) => {
      if (data !== undefined && data._id !== '') {
        this.child = data;
        const rqst: levelsRequest = {
          progress_id: data._id,
        };
        this.stageService
          .getStage(rqst)
          .subscribe((data: getLevelsResponse) => {
            this.stage = data.levels.findIndex((num) => num === 0) + 1;
          });
      }
    });
  }
}
