import {Action} from '@ngrx/store';

export const SET_ROLE = '[USER] Role';

export class SetRole implements Action{
  readonly type = SET_ROLE;

  constructor (public payload: any) {}
}

export type Action = SetRole;
