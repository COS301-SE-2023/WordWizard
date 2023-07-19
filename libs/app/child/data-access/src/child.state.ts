import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Child } from './interfaces/child.interfaces';
import { GetChildren, SetChild, ChangeActive, AddChild } from './child.actions';
import { ChildService } from './child.service';
import { produce } from 'immer';
import { take } from 'rxjs/operators';
import { AddChildService } from '@word-wizard/app/add-child/data-access';

export interface ChildStateModel {
  Children: {
    model:{
        children: Child[];
        currentChild:{
          _id: string;
          username: string;
          age: number;
          parent: string;
          profile_photo: string;
          vocab_list: string;
          practice_list: string;
          progress: string;
        }
        parentActive: boolean;  
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
          _id: '',
          username: '',
          age: 0,
          parent: '',
          profile_photo: '',
          vocab_list: '',
          practice_list: '',
          progress: '',
        },
        parentActive: true  
      }
    }
  }
})

@Injectable()
export class ChildState {

  constructor(
    private readonly store: Store,
    private readonly childService: ChildService,
    private readonly addChildService: AddChildService
  ){}

  @Action(GetChildren)
  async GetChildren(ctx: StateContext<ChildStateModel>, {payload}:GetChildren) {
    
    this.childService.getChildren(payload.parent_email, payload.parent_name)
    .pipe(take(1)) // Potential issue later, omly seems to take first 5 results?
    .subscribe(
      (rsps: Child[]) => {
        ctx.setState(
          produce((draft: ChildStateModel) => {
            draft.Children.model.children = rsps;
          })
        );
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );
  }

  @Action(SetChild)
  async SetChild(ctx: StateContext<ChildStateModel>, {payload}:SetChild) {
    const state = ctx.getState();
    const child = state.Children.model.children.find(c => c._id === payload.childId);
    if(child) {
      ctx.patchState({
        Children: {
          model: {
            ...state.Children.model,
            currentChild: child
          }
        }
      });
    }
  }

  @Action(ChangeActive)
  async ChangeActive(ctx: StateContext<ChildStateModel>, {payload}:ChangeActive) {
    const state = ctx.getState();
    ctx.patchState({
      Children: {
        model: {
          ...state.Children.model,
          parentActive: payload.parentActive
        }
      }
    });
  }

  @Action(AddChild)
  async AddChild(ctx: StateContext<ChildStateModel>, {payload}:AddChild) {
    const rsps = this.addChildService.addChild(payload.parentName, payload.parentEmail, payload.name, payload.age, payload.image);
    console.table(rsps);
    // ctx.setState(
    //   produce((draft: ChildStateModel) => {
    //     draft.Children.model.children.push(rsps);
    //   }
    // ));
  }


  @Selector()
  static Children(state: ChildStateModel) {
    return state.Children.model.children;
  }

  @Selector()
  static currentChild(state: ChildStateModel) {
    return state.Children.model.currentChild;
  }

  @Selector()
  static parentActive(state: ChildStateModel) {
    return state.Children.model.parentActive;
  }
}

