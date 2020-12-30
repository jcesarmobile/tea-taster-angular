import { DataState, initialState, reducer } from './data.reducer';
import {
  ActionTypes,
  initialLoadFailure,
  initialLoadSuccess,
  loginSuccess,
  logoutSuccess,
  sessionRestored,
} from '@app/store/actions';
import { Session, Tea } from '@app/models';

const session: Session = {
  user: {
    id: 314,
    firstName: 'Kevin',
    lastName: 'Minion',
    email: 'goodtobebad@gru.org',
  },
  token: '39948503',
};

const teas: Array<Tea> = [
  {
    id: 1,
    name: 'Green',
    image: 'assets/img/green.jpg',
    description: 'Green teas are green',
  },
  {
    id: 2,
    name: 'Black',
    image: 'assets/img/black.jpg',
    description: 'Black teas are not green',
  },
  {
    id: 3,
    name: 'Herbal',
    image: 'assets/img/herbal.jpg',
    description: 'Herbal teas are not even tea',
  },
];

function createState(stateChanges: {
  teas?: Array<Tea>;
  loading?: boolean;
  errorMessage?: string;
}): DataState {
  return { ...initialState, ...stateChanges };
}

it('returns the default state', () => {
  expect(reducer(undefined, { type: 'NOOP' })).toEqual(initialState);
});

[
  {
    description: `${ActionTypes.LoginSuccess}: sets the loading flag and clears any error message`,
    action: loginSuccess({ session }),
    begin: { errorMessage: 'Unknown error with data load' },
    end: { loading: true },
  },
  {
    description: `${ActionTypes.SessionRestored}: sets the loading flag and clears any error message`,
    action: sessionRestored({ session }),
    begin: { errorMessage: 'Unknown error with data load' },
    end: { loading: true },
  },
  {
    description: `${ActionTypes.InitialLoadFailure}: clears the loading flag and sets the error message`,
    action: initialLoadFailure({ errorMessage: 'The load blew some chunks' }),
    begin: { loading: true },
    end: { errorMessage: 'The load blew some chunks' },
  },
  {
    description: `${ActionTypes.InitialLoadSuccess}: clears the loading flag and sets the teas`,
    action: initialLoadSuccess({ teas }),
    begin: { loading: true },
    end: { teas },
  },
  {
    description: `${ActionTypes.LogoutSuccess}: clears the tea data`,
    action: logoutSuccess(),
    begin: { teas },
    end: {},
  },
].forEach(test =>
  it(test.description, () => {
    expect(reducer(createState(test.begin), test.action)).toEqual(
      createState(test.end),
    );
  }),
);
