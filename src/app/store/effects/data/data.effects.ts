import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import {
  sessionRestored,
  loginSuccess,
  initialLoadSuccess,
  initialLoadFailure,
  teaDetailsChangeRating,
  teaDetailsChangeRatingFailure,
  teaDetailsChangeRatingSuccess,
} from '@app/store/actions';
import { TeaService } from '@app/core';

@Injectable()
export class DataEffects {
  sessionLoaded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccess, sessionRestored),
      mergeMap(() =>
        this.teaService.getAll().pipe(
          map(teas => initialLoadSuccess({ teas })),
          catchError(() =>
            of(
              initialLoadFailure({
                errorMessage: 'Error in data load, check server logs',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  teaRatingChanged$ = createEffect(() =>
    this.actions$.pipe(
      ofType(teaDetailsChangeRating),
      mergeMap(action =>
        from(
          this.teaService.save({ ...action.tea, rating: action.rating }),
        ).pipe(
          map(() =>
            teaDetailsChangeRatingSuccess({
              tea: { ...action.tea, rating: action.rating },
            }),
          ),
          catchError(err =>
            of(
              teaDetailsChangeRatingFailure({
                errorMessage: err.message || 'Unknown error in rating save',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private teaService: TeaService) {}
}
