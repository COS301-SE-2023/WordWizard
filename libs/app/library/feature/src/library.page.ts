import { Component } from '@angular/core';
import { 
  SetVocab,
  SetPractice,
  UpdatePractice,
  LibraryState,
  WordList,
} from '@word-wizard/app/library/data-access';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
@Component({
  selector: 'ww-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss']
})
export class LibraryPage {

  hasVocab = true;
  hasPractice = true;
  practice!:WordList;
  vocab!:WordList;

  @Select(LibraryState.practice) practice$!: Observable<WordList>;
  @Select(LibraryState.vocab) vocab$!: Observable<WordList>;

  constructor(private store: Store){
    // throw new Error("I fucking hate testing");
    this.store.dispatch(new SetPractice());
    this.store.dispatch(new SetVocab());
    this.practice$.subscribe((data) => {;
      if(data.words.length > 0){
        this.hasPractice = true;
        this.practice = data;
      }
    });
    this.vocab$.subscribe((data) => {
      if(data.words.length > 0){
        this.hasVocab = true;
        this.vocab = data;
      }
    });
  }

  test(t:boolean){
    // throw new Error("I fucking hate testing");
    return t;
  }

  handleTextChange(text: string) {
    this.store.dispatch(new UpdatePractice({userID:"64784f19bdfa8f92954b9d78", word: text}));
  }
}
