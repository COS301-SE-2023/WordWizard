import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SetStage, StageState } from '@word-wizard/app/stage/data-access';
import { Observable } from 'rxjs';
import { stage, Coin} from '@word-wizard/app/stage/data-access';
@Component({
  selector: 'stage',
  templateUrl: './stage.page.html',
  styleUrls: ['./stage.page.scss'],
})
export class StagePage {

  //get stage from state
  @Select(StageState.getStage) stage$!: Observable<stage>;

  name= '';
  background='';

  coins : Coin[] = [{name:'', filledStars:0}, {name:'', filledStars:0}, {name:'', filledStars:0}, {name:'', filledStars:0}, {name:'', filledStars:0}];

  constructor(private store: Store) {}

  ngOnInit() {
    //dispatch action to get stage
    this.store.dispatch(new SetStage());

    this.stage$.subscribe((data) => {
      this.name = data.name;
      this.background = data.background;
      this.coins.forEach((coin:Coin, index:number) => {
        coin.name = 'level ' + (index+1);
        coin.filledStars = data.levels[index];
        });
    });

  }
}
