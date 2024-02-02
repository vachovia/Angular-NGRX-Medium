import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {Store} from '@ngrx/store';
import {CommonModule} from '@angular/common';
import {combineLatest} from 'rxjs';
import {RegisterRequestInterface} from './../../types/';
import {authActions, selectIsSubmitting, selectValidationErrors} from './../../store/';
import {BackendErrorMessagesComponent} from './../../../shared/components/';
import {AuthService} from './../../services/auth.service';
import {AuthStateInterface} from './../../types/authState.interface'; ////// dont't need => redux understands
// import { selectIsSubmitting } from './../../../store/selectors';
// import {register} from './../../../store/actions';

@Component({
  selector: 'mc-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule, BackendErrorMessagesComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  // isSubmitting$ = this.store.select(selectIsSubmitting);
  // backendErrors$ = this.store.select(selectValidationErrors);
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });

  constructor(private fb: FormBuilder, private store: Store) {}
  // private store: Store<{auth:AuthStateInterface}>, // moved to effects => private authService: AuthService

  onSubmit() {    
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    };
    this.store.dispatch(authActions.register({request: request}));
    // this.authService.register(request).subscribe(res => console.log('res: ', res));
  }
}
