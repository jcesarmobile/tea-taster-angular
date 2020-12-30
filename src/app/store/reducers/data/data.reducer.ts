import { Action, createReducer, on } from '@ngrx/store';
import * as Actions from '@app/store/actions';
import { Tea } from '@app/models';

export interface DataState {
  teas: Array<Tea>;
  loading: boolean;
  errorMessage: string;
}

export const initialState: DataState = {
  teas: [],
  loading: false,
  errorMessage: '',
};

const dataReducer = createReducer(
  initialState,
  on(Actions.loginSuccess, state => ({
    ...state,
    loading: true,
    errorMessage: '',
  })),
  on(Actions.sessionRestored, state => ({
    ...state,
    loading: true,
    errorMessage: '',
  })),
  on(Actions.initialLoadFailure, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    errorMessage,
  })),
  on(Actions.initialLoadSuccess, (state, { teas }) => ({
    ...state,
    loading: false,
    teas: [...teas],
  })),
  on(Actions.logoutSuccess, state => ({
    ...state,
    teas: [],
  })),
  on(Actions.teaDetailsChangeRatingSuccess, (state, { tea }) => {
    const teas = [...state.teas];
    const idx = state.teas.findIndex(t => t.id === tea.id);
    if (idx > -1) {
      teas.splice(idx, 1, tea);
    }
    return { ...state, teas };
  }),
  on(Actions.teaDetailsChangeRatingFailure, (state, { errorMessage }) => ({
    ...state,
    errorMessage,
  })),
);

export function reducer(state: DataState | undefined, action: Action) {
  return dataReducer(state, action);
}
