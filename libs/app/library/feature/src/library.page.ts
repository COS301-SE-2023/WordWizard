import { Component } from '@angular/core';
import {
  SetVocab,
  SetPractice,
  UpdatePractice,
  LibraryState,
  WordList,
} from '@word-wizard/app/library/data-access';

import { ChildState, Child } from '@word-wizard/app/child/data-access';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
@Component({
  selector: 'ww-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage {
  hasVocab = true;
  hasPractice = true;
  practice!: WordList;
  vocab!: WordList;

  parentActive!: boolean;
  @Select(LibraryState.practice) practice$!: Observable<WordList>;
  @Select(LibraryState.vocab) vocab$!: Observable<WordList>;

  @Select(ChildState.parentActive) parentActive$!: Observable<boolean>;

  helpText: string[] = [
    'Click on Practice list to see words you got wrong in levels.',
    'Click on any word to try to get it right again.',
    'Press on Vocabulary to see all the words you have learned so far.',
  ];
  audioSources: string[] = [
    'assets/mp3/library1.mp3',
    'assets/mp3/library2.mp3',
    'assets/mp3/library3.mp3',
  ];

  constructor(private store: Store) {
    this.store.dispatch(new SetPractice());
    this.store.dispatch(new SetVocab());
    this.practice$.subscribe((data) => {
      if (data.words.length > 0) {
        this.hasPractice = true;
        this.practice = data;
      }
    });
    this.vocab$.subscribe((data) => {
      if (data.words.length > 0) {
        this.hasVocab = true;
        this.vocab = data;
      }
    });

    this.parentActive$.subscribe((data) => {
      if (data === true) this.parentActive = true;
      else this.parentActive = data;
    });
  }

  handleTextChange(text: string) {
    this.store.dispatch(new UpdatePractice({ word: text }));
  }
}
