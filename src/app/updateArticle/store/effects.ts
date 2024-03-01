import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UpdateArticleService } from "./../services";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { Router } from "@angular/router";
import { updateArticleActions } from "./actions";
import { ArticleInterface } from "./../../shared/types";
import {ArticleService as SharedArticleService} from './../../shared/services';
import { HttpErrorResponse } from "@angular/common/http";

export const getArticleEffect = createEffect(
  (actions$ = inject(Actions), articleService = inject(SharedArticleService)) => {
    return actions$.pipe(
      ofType(updateArticleActions.getArticle),
      switchMap(({slug}) => {
        return articleService.getArticle(slug).pipe(
          map((article: ArticleInterface) => {
            return updateArticleActions.getArticleSuccess({article});
          }),
          catchError(() => {
            return of(updateArticleActions.getArticleFailure());
          })
        );
      })
    );
  },
  {functional: true}
);

export const updateArticleEffect = createEffect(
  (actions$ = inject(Actions), updateArticleService = inject(UpdateArticleService)) => {
    return actions$.pipe(
      ofType(updateArticleActions.updateArticle),
      switchMap(({request, slug}) => {
        return updateArticleService.updateArticle(slug,request).pipe(
          map((article: ArticleInterface) => {
            return updateArticleActions.updateArticleSuccess({article});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(updateArticleActions.updateArticleFailure({errors: errorResponse.error.errors}));
          })
        );
      })
    );
  },
  {functional: true}
);

export const redirectAfterUpdateEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(updateArticleActions.updateArticleSuccess),
      tap(({article}) => {
        router.navigate(['/articles', article.slug]);
      })
    );
  },
  {functional: true, dispatch: false}
);
