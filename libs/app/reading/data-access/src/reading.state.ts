import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import {
  SetPassage,
  MakeAttempt
 } from './reading.actions';

 import {produce} from 'immer';

import {
  PassageRequest,
} from './requests/reading.request';

import {
  Word,
} from './interfaces/reading.interfaces';

import { ReadingService } from './reading.service';

export interface ReadingStateModel {
  Passage: {
    model:{
      Content: {
        passage: Word[];
        focusWords: number[];
      },
      Word: {
        // word: string;
        // imageURL: string | null;
        // correct: boolean | null;
        current:number;
        attemptsRemaining: number;
      },
      RecognisedWords:{
        recognisedWords: string[];
      }
//Fair enough
    };
  }
}

@State<ReadingStateModel>({
  name: 'reading',

  defaults: {
    Passage: {
      model: {
        Content:{
          passage: [],
          focusWords: [],
        },
        Word: {
          current: 0,
          attemptsRemaining: 5,
        },
        RecognisedWords:{
          recognisedWords: [],
        }
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


  @Action(SetPassage)
  async setPassage(ctx: StateContext<ReadingStateModel>) {
    const rqst: PassageRequest = {
      userID: '',
      readingLevel: '',
    } as PassageRequest;

    const passage = await this.readingService.getPassage(rqst).toPromise();
    console.log(passage);
    try{
      ctx.setState(
        produce((draft: ReadingStateModel) => {
            draft.Passage.model.Content.passage = passage.passage;
            draft.Passage.model.Content.focusWords = passage.focusWordsIndex;
        })
      );
    } catch (err) {
      console.log(err);
    }
  }

  @Action(MakeAttempt)
  async MakeAttempt(ctx: StateContext<ReadingStateModel>, {payload}:MakeAttempt) {
    const state = ctx.getState();
    const currentAttempts = state.Passage.model.Word.attemptsRemaining;
    if(currentAttempts == 0){
      // ctx.patchState({
      //   ...state,

      //   Passage:{
      //     model:{

      //     }
      //   }
      // })
    }
  }


  @Selector()
  static getReadingState(state: ReadingStateModel) {
    return state.Passage.model.Content;
  }
}

