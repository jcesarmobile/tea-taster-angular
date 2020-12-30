import { Session, Tea } from '@app/models';
import { createAction, props } from '@ngrx/store';

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
