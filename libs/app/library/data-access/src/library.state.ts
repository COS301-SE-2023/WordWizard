import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Word } from './interfaces/library.interfaces';
import { SetPractice, SetVocab } from './library.actions';
import { VocabRequest, PracticeRequest } from './requests/library.requests';
import { LibraryService } from './library.service';
import { produce } from 'immer';

export interface LibraryStateModel {
  Library: {
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
  name: 'library',
  defaults: {
    Library: {
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

  constructor(
    private readonly store: Store,
    private readonly libraryService: LibraryService
  ){}

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
  async setPractice(ctx: StateContext<LibraryStateModel>) {
    const rqst: PracticeRequest = {
      userID: '64784f19bdfa8f92954b9d78', // Grab id from where? Auth state or what?
    } as PracticeRequest;
    const practice = await this.libraryService.getPractice(rqst).toPromise();
    ctx.setState(
      produce((draft: LibraryStateModel) => {
        draft.Library.model.Practice = practice;
      })
    );
  }
    
  @Action(SetVocab)
  async setVocab(ctx: StateContext<LibraryStateModel>) {
    const rqst: VocabRequest = {
      // Tesing with real db id
      userID: '64784f19bdfa8f92954b9d78',
    } as VocabRequest;
    const vocab = await this.libraryService.getVocab(rqst).toPromise();
    ctx.setState(
      produce((draft: LibraryStateModel) => {
        draft.Library.model.Vocab = vocab;
      })
    );
  }

  @Selector()
  static practice(state: LibraryStateModel) {
    return state.Library.model.Practice;
  }

  @Selector()
  static vocab(state: LibraryStateModel) {
    return state.Library.model.Vocab;
  }
}

