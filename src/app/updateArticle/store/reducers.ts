import {routerNavigationAction} from '@ngrx/router-store';
import {createFeature, createReducer, on} from '@ngrx/store';
import {UpdateArticleStateInterface} from './../types/';
import {updateArticleActions} from './';

const initialState: UpdateArticleStateInterface = {
  isLoading: false,
  article: null,
  isSubmitting: false,
  validationErrors: null,
};

const updateArticleFeature = createFeature({
  name: 'updateArticle',
  reducer: createReducer(
    initialState,
    on(updateArticleActions.getArticle, (state) => ({...state, isLoading: true})),
    on(updateArticleActions.getArticleSuccess, (state, action) => ({
      ...state,
      article: action.article,
      isLoading: false,
    })),
    on(updateArticleActions.getArticleFailure, (state) => ({
      ...state,
      isLoading: false,
    })),
    on(updateArticleActions.updateArticle, (state) => ({...state, isSubmitting: true})),
    on(updateArticleActions.updateArticleSuccess, (state) => ({
      ...state,
      isSubmitting: false,
    })),
    on(updateArticleActions.updateArticleFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),
    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: updateArticleFeatureKey,
  reducer: updateArticleReducer,
  selectArticle,
  selectIsLoading,
  selectIsSubmitting,
  selectValidationErrors,
} = updateArticleFeature;
