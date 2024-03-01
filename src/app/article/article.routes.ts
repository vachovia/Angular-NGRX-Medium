import {Route} from '@angular/router';
import {ArticleComponent} from './components';
import * as articleEffects from './store/effects';
import {provideEffects} from '@ngrx/effects';
import {provideState} from '@ngrx/store';
import {articleFeatureKey, articleReducer} from './store';
import {ArticleService} from './services';

export const routes: Route[] = [
  {
    path: '',
    component: ArticleComponent,
    providers: [provideEffects(articleEffects), provideState(articleFeatureKey, articleReducer)],
  },
];

//, ArticleService