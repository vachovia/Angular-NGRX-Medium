import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {articleActions, selectArticleData, selectError, selectIsLoading} from './../../store';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {combineLatest, filter, map} from 'rxjs';
import {selectCurrentUser} from '../../../auth/store';
import {CurrentUserInterface} from '../../../shared/types';
import {CommonModule, DatePipe} from '@angular/common';
import {ErrorMessageComponent, LoadingComponent, TagListComponent} from './../../../shared/components';

@Component({
  selector: 'mc-article',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe, TagListComponent, ErrorMessageComponent, LoadingComponent],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent implements OnInit {
  slug = this.route.snapshot.paramMap.get('slug') ?? '';

  isAuthor$ = combineLatest({
    article: this.store.select(selectArticleData),
    currentUser: this.store
      .select(selectCurrentUser)
      .pipe(filter((currentUser): currentUser is CurrentUserInterface | null => currentUser !== undefined)),
  }).pipe(
    map(({article, currentUser}) => {
      if (!article || !currentUser) {
        return false;
      }
      return article.author.username === currentUser.username;
    })
  );

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    article: this.store.select(selectArticleData),
    isAuthor: this.isAuthor$,
  });

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.store.dispatch(articleActions.getArticle({slug: this.slug}));
  }

  deleteArticle(): void{
    this.store.dispatch(articleActions.deleteArticle({slug: this.slug}));
  }
}
