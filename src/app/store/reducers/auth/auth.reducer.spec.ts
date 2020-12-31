import { initialState, reducer } from './auth.reducer';
import {
  ActionTypes,
  login,
  loginFailure,
  loginSuccess,
  logout,
  logoutFailure,
  logoutSuccess,
  sessionRestored,
  unauthError,
} from '@app/store/actions';
import { Session } from '@app/models';

it('returns the default state', () => {
  expect(reducer(undefined, { type: 'NOOP' })).toEqual(initialState);
});

describe(ActionTypes.Login, () => {
  it('sets the loading flag and clears other data', () => {
    const action = login({ email: 'test@testy.com', password: 'mysecret' });
    expect(
      reducer(
        {
          loading: false,
          errorMessage: 'Invalid Email or Password',
        },
        action,
      ),
    ).toEqual({
      loading: true,
      errorMessage: '',
    });
  });
});

describe(ActionTypes.LoginSuccess, () => {
  it('clears the loading flag and sets the session', () => {
    const session: Session = {
      user: {
        id: 42,
        firstName: 'Douglas',
        lastName: 'Adams',
        email: 'solong@thanksforthefish.com',
      },
      token: 'Imalittletoken',
    };
    const action = loginSuccess({ session });
    expect(reducer({ loading: true, errorMessage: '' }, action)).toEqual({
      session,
      loading: false,
      errorMessage: '',
    });
  });
});

describe(ActionTypes.LoginFailure, () => {
  it('clears the loading flag and sets the error', () => {
    const action = loginFailure({
      errorMessage: 'There was a failure, it was a mess',
    });
    expect(reducer({ loading: true, errorMessage: '' }, action)).toEqual({
      loading: false,
      errorMessage: 'There was a failure, it was a mess',
    });
  });
});

describe(ActionTypes.SessionRestored, () => {
  it('sets the session', () => {
    const session: Session = {
      user: {
        id: 42,
        firstName: 'Douglas',
        lastName: 'Adams',
        email: 'solong@thanksforthefish.com',
      },
      token: 'Imalittletoken',
    };
    const action = sessionRestored({ session });
    expect(reducer({ loading: false, errorMessage: '' }, action)).toEqual({
      session,
      loading: false,
      errorMessage: '',
    });
  });
});

describe('logout actions', () => {
  let session: Session;
  beforeEach(
    () =>
      (session = {
        user: {
          id: 42,
          firstName: 'Douglas',
          lastName: 'Adams',
          email: 'solong@thanksforthefish.com',
        },
        token: 'Imalittletoken',
      }),
  );

  describe(ActionTypes.Logout, () => {
    it('sets the loading flag and clears the error message', () => {
      const action = logout();
      expect(
        reducer(
          {
            session,
            loading: false,
            errorMessage: 'this is useless information',
          },
          action,
        ),
      ).toEqual({
        session,
        loading: true,
        errorMessage: '',
      });
    });
  });

  describe(ActionTypes.LogoutSuccess, () => {
    it('clears the loading flag and the session', () => {
      const action = logoutSuccess();
      expect(
        reducer({ session, loading: true, errorMessage: '' }, action),
      ).toEqual({
        loading: false,
        errorMessage: '',
      });
    });
  });

  describe(ActionTypes.LogoutFailure, () => {
    it('clears the loading flag and sets the error', () => {
      const action = logoutFailure({
        errorMessage: 'There was a failure, it was a mess',
      });
      expect(
        reducer({ session, loading: true, errorMessage: '' }, action),
      ).toEqual({
        session,
        loading: false,
        errorMessage: 'There was a failure, it was a mess',
      });
    });
  });

  describe(ActionTypes.UnauthError, () => {
    it('clears the session', () => {
      const action = unauthError();
      expect(
        reducer(
          {
            session: {
              user: {
                id: 42,
                firstName: 'Douglas',
                lastName: 'Adams',
                email: 'solong@thanksforthefish.com',
              },
              token: 'Imalittletoken',
            },
            loading: false,
            errorMessage: '',
          },
          action,
        ),
      ).toEqual({ loading: false, errorMessage: '' });
    });
  });
});
