import {Component, OnInit} from '@angular/core';
import {ArticleFormValuesInterface} from '../../../shared/components/articleForm/types';
import {ArticleFormComponent, LoadingComponent} from './../../../shared/components';
import {Store, select} from '@ngrx/store';
import {Observable, combineLatest, filter, map} from 'rxjs';
import {
  updateArticleActions,
  selectIsSubmitting,
  selectValidationErrors,
  selectIsLoading,
  selectArticle,
} from './../../store';
import {ArticleInterface, ArticleRequestInterface} from './../../../shared/types';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'mc-update-article',
  standalone: true,
  imports: [ArticleFormComponent, LoadingComponent, CommonModule],
  templateUrl: './update-article.component.html',
  styleUrl: './update-article.component.scss',
})
export class UpdateArticleComponent implements OnInit{
  initialValues$: Observable<ArticleFormValuesInterface> = this.store.pipe(
    select(selectArticle),
    filter((article): article is ArticleInterface => article !== null),
    map((article: ArticleInterface) => {
      return {title: article.title, description: article.description, body: article.body, tagList: article.tagList};
    })
  );

  slug = this.route.snapshot.paramMap.get('slug') ?? '';

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    initialValues: this.initialValues$,
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void{
    this.store.dispatch(updateArticleActions.getArticle({slug:this.slug}))
  }

  onSubmit(articleFormValues: ArticleFormValuesInterface): void {
    const request: ArticleRequestInterface = {
      article: articleFormValues,
    };
    this.store.dispatch(updateArticleActions.updateArticle({request, slug: this.slug}));
  }
}
