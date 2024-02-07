import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, of, switchMap} from 'rxjs';
import {PopularTagService} from './../services';
import {popularTagsActions} from './';
import { PopularTagType } from '../../../types';

export const getPopularTagsEffect = createEffect(
  (actions$ = inject(Actions), popularTagsService = inject(PopularTagService)) => {
    return actions$.pipe(
      ofType(popularTagsActions.getPopularTags),
      switchMap(() => {
        return popularTagsService.getPopularTags().pipe(
          map((popularTags: PopularTagType[]) => {
            return popularTagsActions.getPopularTagsSuccess({popularTags});
          }),
          catchError(() => {
            return of(popularTagsActions.getPopularTagsFailure());
          })
        );
      })
    );
  },
  {functional: true}
);
