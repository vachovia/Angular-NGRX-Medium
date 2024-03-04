import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {Store, select} from '@ngrx/store';
import {authActions, selectCurrentUser} from './../../../auth/store';
import {Subscription, combineLatest, filter} from 'rxjs';
import {CurrentUserInterface, CurrentUserRequestInterface} from '../../../shared/types';
import {selectIsSubmitting, selectValidationErrors} from './../../store';
import {CommonModule} from '@angular/common';
import { BackendErrorMessagesComponent } from './../../../shared/components';

@Component({
  selector: 'mc-settings',
  standalone: true,
  imports: [BackendErrorMessagesComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit, OnDestroy {
  form = this.fb.nonNullable.group({
    image: '',
    username: '',
    bio: '',
    email: '',
    password: '',
  });
  currentUser?: CurrentUserInterface;
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });
  currentUserSubscription?: Subscription;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.currentUserSubscription = this.store
      .pipe(select(selectCurrentUser), filter(Boolean))
      .subscribe((currentUser) => {
        this.currentUser = currentUser;
        this.initializeForm();
      });
  }

  initializeForm(): void {
    if (!this.currentUser) {
      throw new Error('Current user is not set');
    }
    this.form.patchValue({
      image: this.currentUser.image ?? '',
      username: this.currentUser.username,
      bio: this.currentUser.bio ?? '',
      email: this.currentUser.email,
      password: '',
    });
  }

  submit(): void {
    if (!this.currentUser) {
      throw new Error('current user is not set');
    }
    const currentUserRequest: CurrentUserRequestInterface = {
      user: {
        ...this.currentUser,
        ...this.form.getRawValue(),
      },
    };

    this.store.dispatch(authActions.updateCurrentUser({currentUserRequest}));
  }

  logout(): void {
    this.store.dispatch(authActions.logout());
  }

  ngOnDestroy(): void {
    this.currentUserSubscription?.unsubscribe();
  }
}
