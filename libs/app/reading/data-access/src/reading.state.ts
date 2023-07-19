import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import {
  SetPassage,
  MakeAttempt,
  UpdateProgress
 } from './reading.actions';

 import {produce} from 'immer';

import {
  PassageRequest, UpdateProgressRequest,
} from './requests/reading.request';

import {
  Word,
  Content
} from './interfaces/reading.interfaces';

import { ReadingService } from './reading.service';

export interface ReadingStateModel {
  Passage: {
    model:{
      Content: {
        passage: Word[];
        focusWordsIndex: number[];
        done: boolean;
      },
      Word: {
        current:number;
        attemptsRemaining: number;
      },
      level: number;
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
          focusWordsIndex: [],
          done: false
        },
        Word: {
          current: 0,
          attemptsRemaining: 5,
        },
        level: 1
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
      level: ctx.getState().Passage.model.level
    } as PassageRequest;

    const defaultVal: Content = {
      passage: [],
      focusWordsIndex: [],
      done: false
    };

    const passage: Content = await this.readingService.getPassage(rqst).toPromise() ?? defaultVal;
    try{
      ctx.setState(
        produce((draft: ReadingStateModel) => {
            draft.Passage.model.Content.passage = passage.passage;
            draft.Passage.model.Content.focusWordsIndex = passage.focusWordsIndex;
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
        const focus = draft.Passage.model.Content.focusWordsIndex;
        const Word = draft.Passage.model.Word;
        const current = Word.current;
        let attemptsRemaining = Word.attemptsRemaining;
      
        const currentWord = passage[focus[current]];
        attemptsRemaining--;
        if(draft.Passage.model.Content.done){
          if(attemptsRemaining > 0){
            const foundIndex = passage.findIndex((word) => word.word.toLowerCase() === payload.newAttempt.toLowerCase());
            if(foundIndex !== -1)
              passage[foundIndex].correct = true;
            Word.attemptsRemaining = Word.attemptsRemaining - 1;
          } else{
            console.log("No attempts left");
            //Get new passage or move onto next level
          }
        } else{
          if (currentWord.word.toLowerCase() === payload.newAttempt.toLowerCase()) {
            currentWord.correct = true;
            Word.current++;
            Word.attemptsRemaining = 5;
            passage[current].correct = true;
          } else if (attemptsRemaining <= 0) {
            currentWord.correct = false;
            Word.current++;
            Word.attemptsRemaining = 5;
          } else {
            Word.attemptsRemaining = Word.attemptsRemaining - 1;
          }

          if(Word.current === focus.length){
            Word.attemptsRemaining = 5*passage.length;
            draft.Passage.model.Content.done = true;
          }
        }
      })
    )
  }

  @Action(UpdateProgress)
  async updateProgress(ctx: StateContext<ReadingStateModel>, {payload}:UpdateProgress) {
    // Store content and level
    const content = payload.content;
    const level = ctx.getState().Passage.model.level;

    // Calculate score from content
    const totalWords = content.passage.length;
    const correctWords = content.passage.filter((word) => word.correct).length;

    const score = correctWords/totalWords;
    

    // Create request
    const rqst: UpdateProgressRequest = {
      progress:{
        level: level,
        content: content,
        score: score,
        date: new Date()
      }
    } as UpdateProgressRequest;

    // Make request via service to update progress
    this.readingService.updateProgress(rqst);

    // Check if update successful??
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

