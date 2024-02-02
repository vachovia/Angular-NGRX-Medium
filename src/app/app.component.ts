import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import { TopBarComponent } from './shared/components';
import { Store } from '@ngrx/store';
import { authActions } from './auth/store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopBarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor(private store: Store) {}

  ngOnInit(): void{
    this.store.dispatch(authActions.getCurrentUser());
  }
}
