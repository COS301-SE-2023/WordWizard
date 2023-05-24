import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Example } from './reading.actions';

export interface ReadingStateModel {
  test: null;
}

@State<ReadingStateModel>({
  name: 'reading',
})

@Injectable()
export class ReadingState {

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
}

