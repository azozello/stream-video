import {Action} from '@ngrx/store';

export const SET_ROLE = '[USER] Role';
export const SET_EMAIL = '[USER] Email';

export class SetRole implements Action {
  readonly type = SET_ROLE;

  constructor(public payload: string) {
  }
}

export class SetEmail implements Action {
  readonly type = SET_EMAIL;

  constructor(public payload: string) {
  }
}

export type Action = SetRole | SetEmail;
