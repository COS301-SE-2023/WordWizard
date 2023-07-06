import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Child } from './interfaces/child.interfaces';
import { GetChildren } from './child.actions';
// import { GetChildrenRqst } from './requests/child.requests';
import { ChildService } from './child.service';
import { produce } from 'immer';

export interface ChildStateModel {
  Children: {
    model:{
        children: Child[];
        currentChild:{
            username: string;
            age: number;
            parent: string;
            profile_photo: string;
            vocab_list: string;
            practice_list: string;
        }
    };
  }
}

@State<ChildStateModel>({
  name: 'child',
  defaults: {
    Children: {
      model: {
        children: [],
        currentChild: {
            username: '',
            age: 0,
            parent: '',
            profile_photo: '',
            vocab_list: '',
            practice_list: '',
        }
      }
    }
  }
})

@Injectable()
export class ChildState {

  constructor(
    private readonly store: Store,
    private readonly childService: ChildService
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

  @Action(GetChildren)
  async GetChildren(ctx: StateContext<ChildStateModel>, {payload}:GetChildren) {
    // const rqst: UpdateRequest = {
    //   userID: payload.userID,
    //   word: payload.word
    // } as UpdateRequest;
    // const rsps: UpdateResponse = await this.libraryService.UpdatePractice(rqst).toPromise() ?? {status: 'error'};
    // if(rsps.status === 'success'){
    //   ctx.setState(
    //     produce((draft: LibraryStateModel) => {
    //       const practiceList = draft.Library.model.Practice;
    //       const wordIndex = practiceList.words.findIndex((word) => word.word === payload.word);
    //       if (wordIndex !== -1) 
    //         practiceList.words.splice(wordIndex, 1);
    //     })
    //   );
    // }
    const rsps: Child[] = await this.childService.getChildren(payload.parent_email).toPromise() ?? [];
  }

  @Selector()
  static Children(state: ChildStateModel) {
    return state.Children.model.children;
  }

  @Selector()
  static currentChild(state: ChildStateModel) {
    return state.Children.model.currentChild;
  }
}

