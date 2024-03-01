import {Component} from '@angular/core';
import {ArticleFormValuesInterface} from './../../../shared/components/articleForm/types';
import {ArticleFormComponent} from './../../../shared/components';
import {Store} from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { createArticleActions, selectIsSubmitting, selectValidationErrors } from './../../store';
import { ArticleRequestInterface } from '../../../shared/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mc-create-article',
  standalone: true,
  imports: [ArticleFormComponent, CommonModule],
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.scss',
})
export class CreateArticleComponent {
  initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors)
  });

  constructor(private store: Store) {}

  onSubmit(articleFormValues: ArticleFormValuesInterface): void {
    const request: ArticleRequestInterface ={
      article: articleFormValues
    };
    this.store.dispatch(createArticleActions.createArticle({request}));
  }
}
