import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {switchMap, map, catchError, of, tap} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {CurrentUserInterface} from './../../shared/types/';
import {PersistanceService} from './../../shared/services/';
import {AuthService} from './../services/';
import {authActions} from './';

export const registerEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService), persistanceService = inject(PersistanceService)) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({request}) => {
        return authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            persistanceService.set('accessToken', currentUser.token);
            return authActions.registerSuccess({currentUser}); // dispatches automatically
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authActions.registerFailure({
                errors: errorResponse.error.errors,
              })
            );
          })
        );
      })
    );
  },
  {functional: true}
);

export const redirectAfterRegisterEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.registerSuccess),
      tap(() => {
        router.navigateByUrl('/login');
      })
    );
  },
  {functional: true, dispatch: false}
);

export const loginEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService), persistanceService = inject(PersistanceService)) => {
    return actions$.pipe(
      ofType(authActions.login),
      switchMap(({request}) => {
        return authService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            persistanceService.set('accessToken', currentUser.token);
            return authActions.loginSuccess({currentUser}); // dispatches automatically
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authActions.loginFailure({
                errors: errorResponse.error.errors,
              })
            );
          })
        );
      })
    );
  },
  {functional: true}
);

export const redirectAfterLoginEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.loginSuccess),
      tap(() => {
        router.navigateByUrl('/');
      })
    );
  },
  {functional: true, dispatch: false}
);