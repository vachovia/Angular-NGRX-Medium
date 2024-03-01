import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {ArticleRequestInterface, ArticleInterface, BackendErrorsInterface} from './../../shared/types';

export const updateArticleActions = createActionGroup({
  source: 'update article',
  events: {
    'Get Article': props<{slug: string}>(),
    'Get Article Success': props<{article: ArticleInterface}>(),
    'Get Article Failure': emptyProps(),
    'Update Article': props<{request: ArticleRequestInterface, slug: string}>(),
    'Update Article Success': props<{article: ArticleInterface}>(),
    'Update Article Failure': props<{errors: BackendErrorsInterface}>(),
  },
});
