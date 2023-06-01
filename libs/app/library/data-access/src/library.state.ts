import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Word } from './interfaces/library.interfaces';
import { SetPractice, SetVocab } from './library.actions';
import { LibraryService } from './library.service';

export interface LibraryStateModel {
  Passage: {
    model:{
      Practice:{
        words: Word[]
      },
      Vocab:{
        words: Word[]
      }
    };
  }
}

@State<LibraryStateModel>({
  name: 'reading',
  defaults: {
    Passage: {
      model: {
        Practice: {
          words: []
        },
        Vocab: {
          words: []
        }
      }
    }
  }
})

@Injectable()
export class LibraryState {

  constructor(private readonly libraryService: LibraryService) {}

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

  @Action(SetPractice)
  setPractice(ctx: StateContext<LibraryStateModel>, action: SetPractice) {
    console.log("Set practice action called");
  }

  @Action(SetVocab)
  setVocab(ctx: StateContext<LibraryStateModel>, action: SetVocab) {
    console.log("Set vocab action called");
  }


  @Selector()
  static practice(state: LibraryStateModel) {
    return state.Passage.model.Practice;
  }

  @Selector()
  static vocab(state: LibraryStateModel) {
    return state.Passage.model.Vocab;
  }
}

