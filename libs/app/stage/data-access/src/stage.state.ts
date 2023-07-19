import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetStage, SetSelectedStage } from './stage.actions';
import {produce} from 'immer';
import { StageService } from './stage.service';
import { stage, stageRequest } from './interfaces/stage.interface';

export interface StageStateModel {
  Stage:{
    model:{
      name: string;
      levels: number[];
      background: string;
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
  static getSelectedStage(state: StageStateModel) {
    return state.Stage.model.name;
  }

  @Action(SetSelectedStage)
  setSelectedStage(ctx: StateContext<StageStateModel>, { payload }: SetSelectedStage) {
    ctx.setState(
      produce((draft: StageStateModel) => {
        draft.Stage.model.name = payload;
      }))
  }

  @Selector()
  static getStage(state: StageStateModel) {
    return state.Stage.model;
  }

  @Action(SetStage)
  async setStage(ctx: StateContext<StageStateModel>) {

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

