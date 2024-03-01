import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {ArticleRequestInterface, ArticleInterface, BackendErrorsInterface} from './../../shared/types';

export const createArticleActions = createActionGroup({
  source: 'create article',
  events: {
    'Create Article': props<{request: ArticleRequestInterface}>(),
    'Create Article Success': props<{article: ArticleInterface}>(),
    'Create Article Failure': props<{errors: BackendErrorsInterface}>(),
  },
});
