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
        done: boolean;
      },
      Word: {
        // word: string;
        // imageURL: string | null;
        // correct: boolean | null;
        current:number;
        attemptsRemaining: number;
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
          done: false
        },
        Word: {
          current: 0,
          attemptsRemaining: 5,
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
    ctx.setState(
      produce((draft: ReadingStateModel) => {
        const passage = draft.Passage.model.Content.passage;
        const word = draft.Passage.model.Word;
  
        const currentAttempts = word.attemptsRemaining - 1;
        const currentWord = passage[word.current];
  
        if (currentAttempts < 0) {
          currentWord.correct = false;
          word.current++;
          word.attemptsRemaining = 5;
        } else if (currentWord.word.toLowerCase() === payload.newAttempt.toLowerCase()) {
          currentWord.correct = true;
          word.current++;
          word.attemptsRemaining = 5;
        } else {
          word.attemptsRemaining = currentAttempts;
        }
      })
    );
    // const state = ctx.getState();
    // const currentAttempts = state.Passage.model.Word.attemptsRemaining -1;
    // //Attempts are now finished and the word is wrong
    // if(currentAttempts < 0){
    //   state.Passage.model.Content.passage[state.Passage.model.Word.current].correct = false;
    //   ctx.patchState({
    //     ...state,

    //     Passage:{
    //       model:{
    //         Content:{
    //           ...state.Passage.model.Content,
    //         },
    //         Word:{
    //           current: state.Passage.model.Word.current + 1,
    //           attemptsRemaining: 5,
    //         }
    //       }
    //     }
    //   })
    // }
    // //Word is correct
    // else if(state.Passage.model.Content.passage[state.Passage.model.Word.current].word.toLocaleLowerCase() === payload.newAttempt.toLocaleLowerCase()){
    //   let complete = false;
    //   if(state.Passage.model.Content.passage.length <= state.Passage.model.Word.current + 1)
    //     complete = true;
    //   ctx.setState(
    //     produce((draft: ReadingStateModel) => {
    //       const state = draft.Passage.model;
    //       const currentAttempts = state.Word.attemptsRemaining - 1;
    
    //       if (currentAttempts < 0) {
    //         state.Content.passage[state.Word.current].correct = false;
    //         state.Word.current++;
    //         state.Word.attemptsRemaining = 5;
    //       } else if (
    //         state.Content.passage[state.Word.current].word.toLocaleLowerCase() ===
    //         payload.newAttempt.toLocaleLowerCase()
    //       ) {
    //         state.Content.passage[state.Word.current].correct = true;
    //         state.Word.current++;
    //         state.Word.attemptsRemaining = 5;
    //       } else {
    //         state.Word.attemptsRemaining = currentAttempts;
    //       }
    //     })
    //   );
    // }
    // //Attempts are not done and word is incorrect
    // else{
    //   ctx.patchState({
    //     ...state,
    //     Passage:{
    //       model:{
    //         Content:{
    //           ...state.Passage.model.Content,
    //         },
    //         Word:{
    //           ...state.Passage.model.Word,
    //           attemptsRemaining: currentAttempts,
    //         }
    //       }
    //     }
    //   })
    // }
  }


  @Selector()
  static getReadingState(state: ReadingStateModel) {
    return state.Passage.model.Content;
  }

  @Selector()
  static getCurrent(state: ReadingStateModel) {
    return state.Passage.model.Word.current;
  }
}

