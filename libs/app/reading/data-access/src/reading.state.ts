import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import {
  SetPassage,
 } from './reading.actions';

 import {produce} from 'immer';

import {
  PassageRequest,
} from './requests/reading.request';

import {
  FocusWord,
} from './interfaces/reading.interfaces';

import { ReadingService } from './reading.service';

export interface ReadingStateModel {
  Passage: {
    model:{
      passage: string;
      focusWords: FocusWord[];
    };
  }
}

@State<ReadingStateModel>({
  name: 'reading',

  defaults: {
    Passage: {
      model: {
        passage: '',
        focusWords: [],
      }
    }
  }
})

@Injectable()
export class ReadingState {

  constructor(private readonly readingService: ReadingService) {}

  // @Action(Example)
  // example(ctx: StateContext<ReadingStateModel>, action: Example) {
  //   const request = {
  //     word: this.word,
  //     definition: 'A fruit that grows on trees'
  //   } as ReadingRequest;

  //   this.readingService.getVocab(request).subscribe((data) => {
  //     console.log(data);
  //   });
  // }

  @Selector()
  static getPassage(state: ReadingStateModel) {
    return state.Passage.model.passage;
  }

  @Selector()
  static getFocusWords(state: ReadingStateModel) {
    return state.Passage.model.focusWords;
  }

  @Action(SetPassage)
  async setPassage(ctx: StateContext<ReadingStateModel>) {
    const rqst: PassageRequest = {
      userID: '',
      readingLevel: '',
    } as PassageRequest;

    const passage = await this.readingService.getPassage(rqst).toPromise();

    try{
      ctx.setState(
        produce((draft: ReadingStateModel) => {
            draft.Passage.model.passage = passage.passage;
            draft.Passage.model.focusWords = passage.focusWords;
        })
      );
    } catch (err) {
      console.log(err);
    }
  }
}

