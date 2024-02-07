import {createActionGroup, emptyProps, props} from '@ngrx/store';
import { PopularTagType } from './../../../types';

export const popularTagsActions = createActionGroup({
  source: 'popularTags',
  events: {
    'Get Popular Tags': emptyProps(),
    'Get Popular Tags Success': props<{popularTags: PopularTagType[]}>(),
    'Get Popular Tags Failure': emptyProps(),
  },
});
