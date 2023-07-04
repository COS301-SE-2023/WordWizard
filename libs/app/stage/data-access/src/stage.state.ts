import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { SetStage } from './stage.actions';
import {produce} from 'immer';
import { StageService } from './stage.service';
import { stage, stageRequest } from './interfaces/stage.interface';

export interface StageStateModel {
  Stage:{
    model:{
      name: string;//name of the stage
      levels: [number,number,number,number,number];//array of each levels progress(out of 3)
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
        levels: [0,0,0,0,0],
        background: ''
      }
    }
  }
})

@Injectable()
export class StageState {

  constructor(private readonly stageService: StageService) {}

  @Selector()
  static getStage(state: StageStateModel) {
    return state.Stage.model;
  }

  @Action(SetStage)
  async setStage(ctx: StateContext<StageStateModel>) {
    console.log('setStage action called')
    //get current user from auth module and assign it to userID in rqst

    const rqst: stageRequest = {
      userID: '1'
    }

    const defaultVal: stage = {
      name: '',
      levels: [0,0,0,0,0],
      background: ''
    };
    const stage: stage = (await this.stageService.getStage(rqst).toPromise()) ?? defaultVal;
    try{
      console.log('sdfsdf', stage);
      ctx.setState(
        produce((draft: StageStateModel) => {
          draft.Stage.model.background = stage.background;
          draft.Stage.model.levels = stage.levels;
          draft.Stage.model.name = stage.name;
        }))
    }catch(error){
      console.log(error);
    }
  }

}

