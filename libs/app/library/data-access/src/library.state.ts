import { Injectable } from '@angular/core';
import {
  Action,
  Selector,
  State,
  StateContext,
  Store,
  Select,
} from '@ngxs/store';
import { Word, WordList } from './interfaces/library.interfaces';
import { SetPractice, SetVocab, UpdatePractice } from './library.actions';
import {
  VocabRequest,
  PracticeRequest,
  UpdateRequest,
} from './requests/library.requests';
import { UpdateResponse } from './responses/library.responses';
import { LibraryService } from './library.service';
import { produce } from 'immer';
import { Observable } from 'rxjs';
import { ChildState, Child } from '@word-wizard/app/child/data-access';

export interface LibraryStateModel {
  Library: {
    model: {
      Practice: {
        words: Word[];
      };
      Vocab: {
        words: Word[];
      };
    };
  };
}

@State<LibraryStateModel>({
  name: 'library',
  defaults: {
    Library: {
      model: {
        Practice: {
          words: [],
        },
        Vocab: {
          words: [],
        },
      },
    },
  },
})
@Injectable()
export class LibraryState {
  @Select(ChildState.currentChild) currentChild$!: Observable<Child>;
  constructor(
    private readonly store: Store,
    private readonly libraryService: LibraryService,
  ) {}

  @Action(UpdatePractice)
  async UpdatePractice(
    ctx: StateContext<LibraryStateModel>,
    { payload }: UpdatePractice,
  ) {
    let id!: string;
    this.currentChild$
      .subscribe((data) => {
        id = data._id;
      })
      .unsubscribe();

    const rqst: UpdateRequest = {
      userID: id,
      word: payload.word,
    } as UpdateRequest;

    const rsps: UpdateResponse = (await this.libraryService
      .UpdatePractice(rqst)
      .toPromise()) ?? { status: 'error' };
    if (rsps.status === 'success') {
      ctx.setState(
        produce((draft: LibraryStateModel) => {
          const practiceList = draft.Library.model.Practice;
          const wordIndex = practiceList.words.findIndex(
            (word) => word.word === payload.word,
          );
          if (wordIndex !== -1) practiceList.words.splice(wordIndex, 1);
        }),
      );
    }
  }

  @Action(SetPractice)
  async setPractice(ctx: StateContext<LibraryStateModel>) {
    let id!: string;
    this.currentChild$
      .subscribe((data) => {
        id = data._id;
      })
      .unsubscribe();
    const rqst: PracticeRequest = {
      userID: id,
    } as PracticeRequest;
    const practice: WordList = (await this.libraryService
      .getPractice(rqst)
      .toPromise()) ?? { words: [] };
    ctx.setState(
      produce((draft: LibraryStateModel) => {
        draft.Library.model.Practice = practice;
      }),
    );
  }

  @Action(SetVocab)
  async setVocab(ctx: StateContext<LibraryStateModel>) {
    let id!: string;
    this.currentChild$
      .subscribe((data) => {
        id = data._id;
      })
      .unsubscribe();
    const rqst: VocabRequest = {
      userID: id,
    } as VocabRequest;
    const vocab: WordList = (await this.libraryService
      .getVocab(rqst)
      .toPromise()) ?? { words: [] };
    ctx.setState(
      produce((draft: LibraryStateModel) => {
        draft.Library.model.Vocab = vocab;
      }),
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
