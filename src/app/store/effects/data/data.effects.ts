import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import {
  sessionRestored,
  loginSuccess,
  initialLoadSuccess,
  initialLoadFailure,
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

  constructor(private actions$: Actions, private teaService: TeaService) {}
}
