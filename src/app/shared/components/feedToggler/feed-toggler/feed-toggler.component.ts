import {Component, Input, ViewEncapsulation} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectCurrentUser} from './../../../../auth/store';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'mc-feed-toggler',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './feed-toggler.component.html',
  styleUrl: './feed-toggler.component.scss',
})
export class FeedTogglerComponent {
  @Input() tagName?: string;
  currentUser$ = this.store.select(selectCurrentUser);

  constructor(private store: Store) {}
}
