import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SetStage, StageState } from '@word-wizard/app/stage/data-access';
import { Observable } from 'rxjs';
import { stage } from '@word-wizard/app/stage/data-access';

@Component({
  selector: 'stage',
  templateUrl: './stage.page.html',
  styleUrls: ['./stage.page.scss'],
})
export class StagePage {

  //get stage from state
  @Select(StageState.getStage) stage$!: Observable<stage>;

  name= '';
  levels= [0,0,0,0,0];
  background='';

  constructor(private store: Store) {}

  ngOnInit() {
    //dispatch action to get stage
    this.store.dispatch(new SetStage());

    this.stage$.subscribe((data) => {
      console.log('asd',data);

      this.name = data.name;
      this.levels = data.levels;
      this.background = data.background;
    });

  }
}
