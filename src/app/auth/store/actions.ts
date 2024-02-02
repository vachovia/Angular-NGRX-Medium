import {createAction, createActionGroup, emptyProps, props} from '@ngrx/store';
import {RegisterRequestInterface, LoginRequestInterface} from './../types/';
import {CurrentUserInterface, BackendErrorsInterface} from './../../shared/types/';

// export const register = createAction('[Auth] Register', props<{request: RegisterRequestInterface}>())

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{request: RegisterRequestInterface}>(),
    'Register Success': props<{currentUser: CurrentUserInterface}>(),
    'Register Failure': props<{errors: BackendErrorsInterface}>(), //emptyProps(),

    Login: props<{request: LoginRequestInterface}>(),
    'Login Success': props<{currentUser: CurrentUserInterface}>(),
    'Login Failure': props<{errors: BackendErrorsInterface}>(),
  },
});
