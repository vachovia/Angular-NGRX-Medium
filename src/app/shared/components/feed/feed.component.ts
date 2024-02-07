import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {feedActions, selectError, selectFeedData, selectIsLoading} from './store';
import {combineLatest} from 'rxjs';
import {CommonModule, DatePipe} from '@angular/common';
import {ActivatedRoute, Params, Router, RouterLink} from '@angular/router';
import {LoadingComponent, ErrorMessageComponent, PaginationComponent} from './../';
import queryString from 'query-string';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'mc-feed',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe, LoadingComponent, ErrorMessageComponent, PaginationComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent implements OnInit {
  @Input() url: string = '';

  currentPage: number = 0;
  limit: number = environment.limit;
  baseUrl = this.router.url.split('?')[0];

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    feed: this.store.select(selectFeedData),
  });

  constructor(private store: Store, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.currentPage = Number(params['page'] || 1);
      this.fetchFeed();
    });
  }

  fetchFeed(): void {
    const offset = this.currentPage * this.limit - this.limit;

    const parsedUrl = queryString.parseUrl(this.url);

    const stringifiedParams=queryString.stringify({
      limit: this.limit,
      offset: offset,
      ...parsedUrl.query
    });

    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;

    this.store.dispatch(feedActions.getFeed({url: apiUrlWithParams}));
  }
}