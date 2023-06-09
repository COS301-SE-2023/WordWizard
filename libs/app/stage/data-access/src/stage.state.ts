import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';

export interface StageStateModel {
  Stage:{
    model:{
      name: string;//name of the stage
      levels: number[];//array of each levels progress(out of 3)
      background: string;//background image
    }
  }
}

@State<StageStateModel>({
  name: 'stage',
  defaults: {
    Stage:{
      model:{
        name: '',
        levels: [],
        background: ''
      }
    }
  }
})

@Injectable()
export class StageState {

  constructor() {
    //
  }
}

