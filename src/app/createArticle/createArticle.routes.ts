import { Route } from "@angular/router";
import { CreateArticleComponent } from "./components";
import * as createArticleEffects from './store/effects'
import { provideEffects } from "@ngrx/effects";
import { createArticleFeatureKey, createArticleReducer } from "./store";
import { provideState } from "@ngrx/store";

export const routes: Route[] = [
  {
    path: '',
    component: CreateArticleComponent,
    providers: [provideEffects(createArticleEffects), provideState(createArticleFeatureKey, createArticleReducer)],
  },
];