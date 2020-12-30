import { DataState, initialState, reducer } from './data.reducer';
import {
  ActionTypes,
  initialLoadFailure,
  initialLoadSuccess,
  loginSuccess,
  logoutSuccess,
  noteDeleted,
  noteDeletedFailure,
  noteDeletedSuccess,
  noteSaved,
  noteSavedFailure,
  noteSavedSuccess,
  notesPageLoaded,
  notesPageLoadedFailure,
  notesPageLoadedSuccess,
  sessionRestored,
  teaDetailsChangeRatingFailure,
  teaDetailsChangeRatingSuccess,
} from '@app/store/actions';
import { Session, TastingNote, Tea } from '@app/models';

const notes: Array<TastingNote> = [
  {
    id: 42,
    brand: 'Lipton',
    name: 'Green Tea',
    teaCategoryId: 3,
    rating: 3,
    notes: 'A basic green tea, very passable but nothing special',
  },
  {
    id: 314159,
    brand: 'Lipton',
    name: 'Yellow Label',
    teaCategoryId: 2,
    rating: 1,
    notes:
      'Very acidic, even as dark teas go, OK for iced tea, horrible for any other application',
  },
  {
    id: 73,
    brand: 'Rishi',
    name: 'Puer Cake',
    teaCategoryId: 6,
    rating: 5,
    notes: 'Smooth and peaty, the king of puer teas',
  },
];

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
    begin: { notes, teas },
    end: {},
  },
  {
    description: `${ActionTypes.TeaDetailsChangeRatingSuccess}: sets the rating for the tea`,
    action: teaDetailsChangeRatingSuccess({ tea: { ...teas[1], rating: 3 } }),
    begin: { teas },
    end: { teas: [teas[0], { ...teas[1], rating: 3 }, teas[2]] },
  },
  {
    description: `${ActionTypes.TeaDetailsChangeRatingFailure}: sets the error message`,
    action: teaDetailsChangeRatingFailure({
      errorMessage: 'The save blew some chunks',
    }),
    begin: { teas },
    end: { teas, errorMessage: 'The save blew some chunks' },
  },
  {
    description: `${ActionTypes.NotesPageLoaded}: sets the loading flag and clears any error message`,
    action: notesPageLoaded(),
    begin: { teas, errorMessage: 'The last thing, it failed' },
    end: { teas, loading: true },
  },
  {
    description: `${ActionTypes.NotesPageDataLoadedSuccess}: adds the notes / clears the loading flag`,
    action: notesPageLoadedSuccess({ notes }),
    begin: { teas, loading: true },
    end: { teas, notes },
  },
  {
    description: `${ActionTypes.NotesPageDataLoadedFailure}: adds the error message / clears the loading flag`,
    action: notesPageLoadedFailure({ errorMessage: 'Something is borked' }),
    begin: { notes, teas, loading: true },
    end: { notes, teas, errorMessage: 'Something is borked' },
  },
  {
    description: `${ActionTypes.NoteSaved}: sets the loading flag and clears any error message`,
    action: noteSaved({ note: notes[2] }),
    begin: { notes, teas, errorMessage: 'The last thing, it failed' },
    end: { notes, teas, loading: true },
  },
  {
    description: `${ActionTypes.NoteSavedSuccess}: updates an existing note`,
    action: noteSavedSuccess({
      note: { ...notes[2], brand: 'Generic Tea Co.' },
    }),
    begin: { notes, teas, loading: true },
    end: {
      notes: [notes[0], notes[1], { ...notes[2], brand: 'Generic Tea Co.' }],
      teas,
    },
  },
  {
    description: `${ActionTypes.NoteSavedSuccess}: appends a new note`,
    action: noteSavedSuccess({
      note: {
        id: 999943,
        brand: 'Berkley',
        name: 'Green Tea',
        teaCategoryId: 3,
        rating: 2,
        notes: 'I am not sure this is even tea',
      },
    }),
    begin: { notes, teas, loading: true },
    end: {
      notes: [
        ...notes,
        {
          id: 999943,
          brand: 'Berkley',
          name: 'Green Tea',
          teaCategoryId: 3,
          rating: 2,
          notes: 'I am not sure this is even tea',
        },
      ],
      teas,
    },
  },
  {
    description: `${ActionTypes.NoteSavedFailure}: adds the error message / clears the loading flag`,
    action: noteSavedFailure({ errorMessage: 'Something is borked' }),
    begin: { notes, teas, loading: true },
    end: { notes, teas, errorMessage: 'Something is borked' },
  },
  {
    description: `${ActionTypes.NoteDeleted}: sets the loading flag and clears any error message`,
    action: noteDeleted({ note: notes[0] }),
    begin: { notes, teas, errorMessage: 'The last thing, it failed' },
    end: { notes, teas, loading: true },
  },
  {
    description: `${ActionTypes.NoteDeletedSuccess}: removes the note`,
    action: noteDeletedSuccess({ note: notes[1] }),
    begin: { notes, teas, loading: true },
    end: { notes: [notes[0], notes[2]], teas },
  },
  {
    description: `${ActionTypes.NoteDeletedFailure}: adds the error message / clears the loading flag`,
    action: noteDeletedFailure({ errorMessage: 'Something is borked' }),
    begin: { notes, teas, loading: true },
    end: { notes, teas, errorMessage: 'Something is borked' },
  },
].forEach(test =>
  it(test.description, () => {
    expect(reducer(createState(test.begin), test.action)).toEqual(
      createState(test.end),
    );
  }),
);
