import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../../auth/store';
import { combineLatest } from 'rxjs';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mc-topbar',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './topBar.component.html',
  styleUrl: './topBar.component.scss'
})
export class TopBarComponent {
  data$ = combineLatest({
     currentUser: this.store.select(selectCurrentUser)
  });

  constructor(private store: Store){ }

}
