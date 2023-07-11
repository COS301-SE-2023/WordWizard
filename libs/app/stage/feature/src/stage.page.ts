import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SetStage, StageState } from '@word-wizard/app/stage/data-access';
import { Observable } from 'rxjs';
import { stage, Coin} from '@word-wizard/app/stage/data-access';

@Component({
  selector: 'ww-stage',
  templateUrl: './stage.page.html',
  styleUrls: ['./stage.page.scss'],
})
export class StagePage {

  //get stage from state
  @Select(StageState.getStage) stage$!: Observable<stage>;

  name= '';
  background='';

  coins : Coin[] = [{name:''} as Coin, {name:''}as Coin, {name:''}as Coin, {name:''}as Coin, {name:''}as Coin];

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new SetStage());

    this.stage$.subscribe((data) => {
      this.name = data.name;
      this.background = data.background;
      this.coins.forEach((coin:Coin, index:number) => {
        coin.filledStars = data.levels[index];
        coin.name = 'level ' + (index+1);
      });
    });

  }
}
