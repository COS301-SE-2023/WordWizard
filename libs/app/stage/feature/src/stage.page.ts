import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SetStage, StageState, SetSelectedStage } from '@word-wizard/app/stage/data-access';
import { Observable } from 'rxjs';
import { stage, Coin} from '@word-wizard/app/stage/data-access';

@Component({
  selector: 'ww-stage',
  templateUrl: './stage.page.html',
  styleUrls: ['./stage.page.scss'],
})
export class StagePage implements OnInit{

  //get stage from state
  @Select(StageState.getStage) stage$!: Observable<stage>;
  @Select(StageState.getSelectedStage) selectedStage$!: Observable<number>;

  name= '';
  background='';

  coins : Coin[] = [{name:''} as Coin, {name:''}as Coin, {name:''}as Coin, {name:''}as Coin, {name:''}as Coin, {name:''} as Coin, {name:''}as Coin, {name:''}as Coin, {name:''}as Coin, {name:''}as Coin, {name:''} as Coin, {name:''}as Coin, {name:''}as Coin, {name:''}as Coin, {name:''}as Coin, {name:''} as Coin, {name:''}as Coin, {name:''}as Coin, {name:''}as Coin, {name:''}as Coin];

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new SetStage());

    this.stage$.subscribe((data) => {
      this.coins.forEach((coin:Coin, index:number) => {
        coin.filledStars = data.levels[index];
        coin.name = 'level' + (index+1);
      });
    });

    this.selectedStage$.subscribe((data) => {
      console.log(data);
    });

  }

  levelSet($event: string){
    this.store.dispatch(new SetSelectedStage(this.extractNumberFromString($event) || 0));
  }

  extractNumberFromString(inputString: string): number | null {
    const regex = /\d+/;
    const matches = inputString.match(regex);
    if (matches && matches.length > 0) {
      return parseInt(matches[0], 10);
    }
    return null;
  }

}
