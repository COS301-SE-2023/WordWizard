import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetStage, SetSelectedStage } from './stage.actions';
import {produce} from 'immer';
import { StageService } from './stage.service';
import { stage } from './interfaces/stage.interface';
import { levelsRequest } from './requests/stage.requests';
import { getLevelsResponse } from './responses/stage.responses';

export interface StageStateModel {
  Stage:{
    model:{
      levels: number[];
      selectedLevel: number;
    }
  }
}

@State<StageStateModel>({
  name: 'stage',
  defaults: {
    Stage:{
      model:{
        levels: [0,0,0,0,0],
        selectedLevel: 0
      }
    }
  }
})

@Injectable()
export class StageState {

  constructor(private readonly stageService: StageService) {}

  @Selector()
  static nextLevel(state: StageStateModel) {

    const tempLevels = state.Stage.model.levels;
    let nextLevel = 0;

    tempLevels.forEach((level, index) => {
      if(level >= 50){
        nextLevel = index + 1;
      }
    });

    return nextLevel;
  }

  @Selector()
  static getSelectedStage(state: StageStateModel) {
    return state.Stage.model.selectedLevel;
  }

  @Action(SetSelectedStage)
  setSelectedStage(ctx: StateContext<StageStateModel>, { payload }: SetSelectedStage) {
    ctx.setState(
      produce((draft: StageStateModel) => {
        draft.Stage.model.selectedLevel = payload;
      }))
  }

  @Selector()
  static getStage(state: StageStateModel) {
    return state.Stage.model;
  }

  @Selector()
  static getLevelsArray(state: StageStateModel) {
    return state.Stage.model.levels;
  }

  @Action(SetStage)
  async setStage(ctx: StateContext<StageStateModel>) {

    const rqst: levelsRequest = {
      progress_id: '64aea0695102acb3adb889ad'
    }

    const defaultVal: getLevelsResponse = {
      levels: [0,0,0,0,0],
    };
    const stage: getLevelsResponse = (await this.stageService.getStage(rqst).toPromise()) ?? defaultVal;
    console.log(' ', stage);
    try{
      ctx.setState(
        produce((draft: StageStateModel) => {
          draft.Stage.model.levels = stage.levels;
          draft.Stage.model.selectedLevel = 0;
        }))
    }catch(error){
      console.log(error);
    }
  }

}

