import { Action, createReducer, on } from '@ngrx/store';
import * as Actions from '@app/store/actions';
import { TastingNote, Tea } from '@app/models';

export interface DataState {
  notes: Array<TastingNote>;
  teas: Array<Tea>;
  loading: boolean;
  errorMessage: string;
}

export const initialState: DataState = {
  notes: [],
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
    notes: [],
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
  on(Actions.notesPageLoaded, state => ({
    ...state,
    loading: true,
    errorMessage: '',
  })),
  on(Actions.notesPageLoadedSuccess, (state, { notes }) => ({
    ...state,
    loading: false,
    notes,
  })),
  on(Actions.notesPageLoadedFailure, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    errorMessage,
  })),
  on(Actions.noteSaved, state => ({
    ...state,
    loading: true,
    errorMessage: '',
  })),
  on(Actions.noteSavedSuccess, (state, { note }) => {
    const notes = [...state.notes];
    const idx = notes.findIndex(n => n.id === note.id);
    if (idx > -1) {
      notes.splice(idx, 1, note);
    } else {
      notes.push(note);
    }
    return {
      ...state,
      notes,
      loading: false,
    };
  }),
  on(Actions.noteSavedFailure, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    errorMessage,
  })),
  on(Actions.noteDeleted, state => ({
    ...state,
    loading: true,
    errorMessage: '',
  })),
  on(Actions.noteDeletedSuccess, (state, { note }) => {
    const notes = [...state.notes];
    const idx = notes.findIndex(n => n.id === note.id);
    if (idx > -1) {
      notes.splice(idx, 1);
    }
    return {
      ...state,
      notes,
      loading: false,
    };
  }),
  on(Actions.noteDeletedFailure, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    errorMessage,
  })),
);

export function reducer(state: DataState | undefined, action: Action) {
  return dataReducer(state, action);
}
