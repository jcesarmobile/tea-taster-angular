import { TestBed } from '@angular/core/testing';
import { NavController } from '@ionic/angular';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { ActionTypes, login, loginSuccess } from '@app/store/actions';
import { AuthEffects } from './auth.effects';
import { createNavControllerMock } from '@test/mocks';

describe('AuthEffects', () => {
  let actions$: Observable<any>;
  let effects: AuthEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        { provide: NavController, useFactory: createNavControllerMock },
      ],
    });
    effects = TestBed.inject(AuthEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('login$', () => {
    describe('on login success', () => {
      it('dispatches login success', done => {
        actions$ = of(login({ email: 'test@test.com', password: 'test' }));
        effects.login$.subscribe(action => {
          expect(action).toEqual({
            type: ActionTypes.LoginSuccess,
            session: {
              user: {
                id: 73,
                firstName: 'Ken',
                lastName: 'Sodemann',
                email: 'test@test.com',
              },
              token: '314159',
            },
          });
          done();
        });
      });
    });

    describe('on login failure', () => {
      it('dispatches login error', done => {
        actions$ = of(login({ email: 'test@test.com', password: 'badpass' }));
        effects.login$.subscribe(action => {
          expect(action).toEqual({
            type: ActionTypes.LoginFailure,
            errorMessage: 'Invalid Username or Password',
          });
          done();
        });
      });
    });
  });

  describe('loginSuccess$', () => {
    it('navigates to the root path', done => {
      const navController = TestBed.inject(NavController);
      actions$ = of(
        loginSuccess({
          session: {
            user: {
              id: 73,
              firstName: 'Ken',
              lastName: 'Sodemann',
              email: 'test@test.com',
            },
            token: '314159',
          },
        }),
      );
      effects.loginSuccess$.subscribe(() => {
        expect(navController.navigateRoot).toHaveBeenCalledTimes(1);
        expect(navController.navigateRoot).toHaveBeenCalledWith(['/']);
        done();
      });
    });
  });
});
