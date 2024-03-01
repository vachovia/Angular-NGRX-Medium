import { Route } from "@angular/router";
import {UpdateArticleComponent} from './components';
import * as updateArticleEffects from './store/effects'
import { provideEffects } from "@ngrx/effects";
import {updateArticleFeatureKey, updateArticleReducer} from './store';
import { provideState } from "@ngrx/store";

export const routes: Route[] = [
  {
    path: '',
    component: UpdateArticleComponent,
    providers: [provideEffects(updateArticleEffects), provideState(updateArticleFeatureKey, updateArticleReducer)],
  },
];