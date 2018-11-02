import * as fromUsers from './userReducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export interface State {
  user: fromUsers.State;
}

export const reducers: ActionReducerMap<State> = {
  user: fromUsers.reducer
};

export const getUserState = createFeatureSelector<fromUsers.State>('user');

export const getId = createSelector(getUserState, fromUsers.getId);
export const getEmail= createSelector(getUserState, fromUsers.getEmail);
export const getRole = createSelector(getUserState, fromUsers.getRole);
