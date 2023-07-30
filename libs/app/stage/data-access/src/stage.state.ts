import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Select } from '@ngxs/store';
import { SetStage, SetSelectedStage } from './stage.actions';
import {produce} from 'immer';
import { StageService } from './stage.service';
import { stage } from './interfaces/stage.interface';
import { levelsRequest } from './requests/stage.requests';
import { getLevelsResponse } from './responses/stage.responses';
import {
  ChildState,
  Child
} from '@word-wizard/app/child/data-access';
import { Observable } from 'rxjs';

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

  @Select(ChildState.currentChild) currentChild$!: Observable<Child>;

  constructor(private readonly stageService: StageService) {}

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
    let childId = '';
    this.currentChild$.subscribe((data) => {
      childId = data._id;
    });

    const rqst: levelsRequest = {
      progress_id: childId
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

