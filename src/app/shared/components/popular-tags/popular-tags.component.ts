import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Store} from '@ngrx/store';
import {popularTagsActions, selectError, selectIsLoading, selectPopularTagsData} from './store';
import {combineLatest} from 'rxjs';
import {CommonModule} from '@angular/common';
import {ErrorMessageComponent, LoadingComponent} from './../';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'mc-popular-tags',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, RouterLink, LoadingComponent, ErrorMessageComponent],
  templateUrl: './popular-tags.component.html',
  styleUrl: './popular-tags.component.scss',
})
export class PopularTagsComponent implements OnInit {
  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    popularTags: this.store.select(selectPopularTagsData),
  });

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(popularTagsActions.getPopularTags());
  }
}
