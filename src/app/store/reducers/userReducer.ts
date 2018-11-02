import * as UserAction from '../actions/user';

export interface State {
  id: number;
  email: string;
  userRole: string;
}

export const InitialState: State = {
  id: 1,
  email: 'denys.panov@gmail.com',
  userRole: 'USER'
};

export function reducer(state = InitialState, action: UserAction.Action) {
  switch (action.type) {
    case UserAction.SET_ROLE:
      return {
        ...state,
        userRole: action.payload
      };
    default:
      return state;
  }
}

export const getId = (state: State) => state.id;
export const getEmail = (state: State) => state.email;
export const getRole = (state: State) => state.userRole;
