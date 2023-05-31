import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';

export interface StageStateModel {
  example: string;
}

@State<StageStateModel>({
  name: 'stage',
})

@Injectable()
export class StageState {

  constructor() {
    //
  }
}

