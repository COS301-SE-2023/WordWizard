import { User } from '@auth0/auth0-angular';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { produce } from 'immer';
// import { AuthService } from '@auth0/auth0-angular';

import { login, logout, setUser, signup } from './auth.actions';

export interface AuthStateModel {
  user: User | null;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    user: null,
  },
})
@Injectable()
export class AuthState {
  constructor(private store: Store) {}

  @Selector()
  static getUser(state: AuthStateModel) {
    return state.user;
  }

  @Action(setUser)
  async setUser(ctx: StateContext<AuthStateModel>, { user }: setUser) {
    ctx.setState(
      produce((draft: AuthStateModel) => {
        draft.user = user;
      }),
    );
  }

  @Action(logout)
  async logout(ctx: StateContext<AuthStateModel>) {
    try {
      //call Auth0
      ctx.dispatch(new setUser({ user: null }));
    } catch {
      //handle error
    }
  }
}
