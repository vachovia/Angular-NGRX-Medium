import {createActionGroup, emptyProps, props} from '@ngrx/store'
import { ArticleInterface } from './../../../types';

export const addToFavoritesActions = createActionGroup({
  source: 'Add To Favorites',
  events: {
    'Add To Favorites': props<{isFavorited: boolean; slug: string}>(),
    'Add To Favorites success': props<{article: ArticleInterface}>(),
    'Add To Favorites failure': emptyProps(),
  },
});
