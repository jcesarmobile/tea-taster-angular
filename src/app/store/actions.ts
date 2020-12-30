import { createAction, props } from '@ngrx/store';

import { Session, TastingNote, Tea } from '@app/models';

export enum ActionTypes {
  InitialLoadSuccess = '[Data API] initial data load success',
  InitialLoadFailure = '[Data API] initial data load failure',

  Login = '[LoginPage] login',
  LoginSuccess = '[Auth API] login success',
  LoginFailure = '[Auth API] login failure',

  Logout = '[Application] logout',
  LogoutSuccess = '[Auth API] logout success',
  LogoutFailure = '[Auth API] logout failure',

  UnauthError = '[Auth API] unauthenticated error',

  SessionRestored = '[Vault API] session restored',

  TeaDetailsChangeRating = '[Tea Details Page] change rating',
  TeaDetailsChangeRatingSuccess = '[Data API] change rating success',
  TeaDetailsChangeRatingFailure = '[Data API] change rating failure',

  NotesPageLoaded = '[Notes Page] loaded',
  NotesPageDataLoadedSuccess = '[Data API] notes page loaded success',
  NotesPageDataLoadedFailure = '[Data API] notes page loaded failure',

  NoteSaved = '[Note Editor] note saved',
  NoteSavedSuccess = '[Data API] note saved success',
  NoteSavedFailure = '[Data API] note saved failure',

  NoteDeleted = '[Notes Page] note deleted',
  NoteDeletedSuccess = '[Data API] note deleted success',
  NoteDeletedFailure = '[Data API] note deleted failure',
}

export const initialLoadSuccess = createAction(
  ActionTypes.InitialLoadSuccess,
  props<{ teas: Array<Tea> }>(),
);
export const initialLoadFailure = createAction(
  ActionTypes.InitialLoadFailure,
  props<{ errorMessage: string }>(),
);

export const login = createAction(
  ActionTypes.Login,
  props<{ email: string; password: string }>(),
);
export const loginSuccess = createAction(
  ActionTypes.LoginSuccess,
  props<{ session: Session }>(),
);
export const loginFailure = createAction(
  ActionTypes.LoginFailure,
  props<{ errorMessage: string }>(),
);

export const logout = createAction(ActionTypes.Logout);
export const logoutSuccess = createAction(ActionTypes.LogoutSuccess);
export const logoutFailure = createAction(
  ActionTypes.LogoutFailure,
  props<{ errorMessage: string }>(),
);

export const unauthError = createAction(ActionTypes.UnauthError);

export const sessionRestored = createAction(
  ActionTypes.SessionRestored,
  props<{ session: Session }>(),
);

export const teaDetailsChangeRating = createAction(
  ActionTypes.TeaDetailsChangeRating,
  props<{ tea: Tea; rating: number }>(),
);
export const teaDetailsChangeRatingSuccess = createAction(
  ActionTypes.TeaDetailsChangeRatingSuccess,
  props<{ tea: Tea }>(),
);
export const teaDetailsChangeRatingFailure = createAction(
  ActionTypes.TeaDetailsChangeRatingFailure,
  props<{ errorMessage: string }>(),
);

export const notesPageLoaded = createAction(ActionTypes.NotesPageLoaded);
export const notesPageLoadedSuccess = createAction(
  ActionTypes.NotesPageDataLoadedSuccess,
  props<{ notes: Array<TastingNote> }>(),
);
export const notesPageLoadedFailure = createAction(
  ActionTypes.NotesPageDataLoadedFailure,
  props<{ errorMessage: string }>(),
);

export const noteSaved = createAction(
  ActionTypes.NoteSaved,
  props<{ note: TastingNote }>(),
);
export const noteSavedSuccess = createAction(
  ActionTypes.NoteSavedSuccess,
  props<{ note: TastingNote }>(),
);
export const noteSavedFailure = createAction(
  ActionTypes.NoteSavedFailure,
  props<{ errorMessage: string }>(),
);

export const noteDeleted = createAction(
  ActionTypes.NoteDeleted,
  props<{ note: TastingNote }>(),
);
export const noteDeletedSuccess = createAction(
  ActionTypes.NoteDeletedSuccess,
  props<{ note: TastingNote }>(),
);
export const noteDeletedFailure = createAction(
  ActionTypes.NoteDeletedFailure,
  props<{ errorMessage: string }>(),
);
