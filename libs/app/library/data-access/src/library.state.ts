import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';

export interface LibraryStateModel {
  Passage: {
    model:{
      Content: {
        passage: string[];
        focusWordsIndex: number[];
        done: boolean;
      },
      Word: {
        current:number;
        attemptsRemaining: number;
      }
    };
  }
}

@State<LibraryStateModel>({
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
        }
      }
    }
  }
})

@Injectable()
export class LibraryState {

//   constructor() {}

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
  static getCurrent(state: LibraryStateModel) {
    return state.Passage.model.Word.current;
  }
}

