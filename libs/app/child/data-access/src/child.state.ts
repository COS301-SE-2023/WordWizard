import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Child } from './interfaces/child.interfaces';
import { GetChildren, SetChild } from './child.actions';
import { ChildService } from './child.service';
import { produce } from 'immer';

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
            _id: '',
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

  @Action(GetChildren)
  async GetChildren(ctx: StateContext<ChildStateModel>, {payload}:GetChildren) {
    const rsps: Child[] = await this.childService.getChildren(payload.parent_email).toPromise() ?? [];
    ctx.setState(
        produce((draft: ChildStateModel) => {
            draft.Children.model.children = rsps;
        })
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

  @Selector()
  static Children(state: ChildStateModel) {
    return state.Children.model.children;
  }

  @Selector()
  static currentChild(state: ChildStateModel) {
    return state.Children.model.currentChild;
  }
}

