import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromUsers from './userReducer';
import * as fromStreamList from './streamListReducer';


export interface State {
  user: fromUsers.State;
  streams: fromStreamList.State;
}

export const reducers: ActionReducerMap<State> = {
  user: fromUsers.reducer,
  streams: fromStreamList.reducer,
};

export const getUserState = createFeatureSelector<fromUsers.State>('user');
export const getId = createSelector(getUserState, fromUsers.getId);
export const getEmail = createSelector(getUserState, fromUsers.getEmail);
export const getRole = createSelector(getUserState, fromUsers.getRole);

export const getStreamListState = createFeatureSelector<fromStreamList.State>('streams');
export const getStreamsList = createSelector(getStreamListState, fromStreamList.getStreams);
