import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Selector, State, StateContext, Store, Select } from '@ngxs/store';
import {
  SetPassage,
  MakeAttempt,
  UpdateProgress
} from './reading.actions';
import { 
  ChildState,
  Child
} from '@word-wizard/app/child/data-access';
import { Observable } from 'rxjs';
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

  @Select(ChildState.currentChild) currentChild$!: Observable<Child>;

  constructor(private readonly readingService: ReadingService, private readonly router: Router, private readonly store: Store ) {}

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
        // console.log("Passage[1]: ", passage[1].word, passage[1].correct)
        // console.log("...Content: ",draft.Passage.model.Content);
        if(draft.Passage.model.Content.done){
          if(attemptsRemaining > 0) {
            const foundIndex = passage.findIndex((word) => word.word.toLowerCase() === payload.newAttempt.toLowerCase());
            if(foundIndex !== -1)
              passage[foundIndex].correct = true;
              // console.log("Word correct: ",passage[foundIndex], passage[foundIndex].correct )
            Word.attemptsRemaining = Word.attemptsRemaining - 1;
            if(passage.every((word) => word.correct !== null)) {
              this.store.dispatch(new UpdateProgress());
              console.log('done');
            }
          } else {
            this.store.dispatch(new UpdateProgress());
            console.log('done, out of attempts');
          }
        } else{
            console.log(currentWord);
          if (currentWord.word.toLowerCase() === payload.newAttempt.toLowerCase()) {
            currentWord.correct = true;
            Word.current++;
            Word.attemptsRemaining = 2;
            passage[current].correct = true;
          } else if (attemptsRemaining <= 0) {
            currentWord.correct = false;
            Word.current++;
            Word.attemptsRemaining = 2;
          } else {
            Word.attemptsRemaining = Word.attemptsRemaining - 1;
          }

          if(Word.current === focus.length){
            Word.attemptsRemaining = 2*passage.length;
            draft.Passage.model.Content.done = true;
          }
        }
      })
    )
  }

  @Action(UpdateProgress)
  async updateProgress(ctx: StateContext<ReadingStateModel>) {
    // Store content and level
    ctx.setState(
      produce((draft: ReadingStateModel) => {
        const content = draft.Passage.model.Content.passage;
        const level = draft.Passage.model.level;
        const totalWords = content.length;
        const correctWords = content.filter((word) => word.correct).length;
        // console.log("Correct words: ", correctWords);
        // console.log("Total words: ", totalWords);
        // console.log("Score: ", (correctWords/totalWords)*100); // Think it needs to be multiplied by 100?
        this.currentChild$.subscribe((data) => {
          const rqst: UpdateProgressRequest = {
            child_id: data._id,
            progress:{
              level: level,
              content: content,
              score: (correctWords/totalWords)*100,
              date: `${new Date()}`,
              incorrect_words: totalWords - correctWords,
            }
          }
          this.readingService.updateProgress(rqst).subscribe((data) => {
            //Do something else idk?
            this.router.navigate(['/stage']);
          });
        });
      })
    )
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

