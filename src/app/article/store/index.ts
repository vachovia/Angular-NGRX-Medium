import {articleActions} from './actions';
import {getArticleEffect, deleteArticleEffect, redirectAfterDeleteEffect} from './effects';
import {articleFeatureKey, articleReducer, selectIsLoading, selectError, selectArticleData} from './reducers';

export {
  articleActions,
  getArticleEffect,
  deleteArticleEffect,
  redirectAfterDeleteEffect,
  articleFeatureKey,
  articleReducer,
  selectIsLoading,
  selectError,
  selectArticleData,
};
