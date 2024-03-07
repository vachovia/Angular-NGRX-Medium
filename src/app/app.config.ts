import {ApplicationConfig, isDevMode} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideState, provideStore} from '@ngrx/store';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {authFeatureKey, authReducer} from './auth/store/reducers';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideEffects} from '@ngrx/effects';
import * as authEffects from './auth/store/effects'; // works only with * syntax does not work with destructuing {registerEffect} etc.
import * as feedEffects from './shared/components/feed/store/effects';
import * as popularTagsEffects from './shared/components/popular-tags/store/effects';
import * as addToFavoritesEffect from './shared/components/addToFavorites/store/effects';
import {provideRouterStore, routerReducer} from '@ngrx/router-store';
import {authInterceptor} from './shared/services';
import {feedFeatureKey, feedReducer} from './shared/components/feed/store';
import {popularTagsFeatureKey, popularTagsReducer} from './shared/components/popular-tags/store';
import { AddToFavoritesService } from './shared/components/addToFavorites/services';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes),
    provideStore({
      router: routerReducer, // to clear Validation Errors after navigation
    }),
    provideRouterStore(),
    provideState(authFeatureKey, authReducer),
    provideState(feedFeatureKey, feedReducer),
    provideState(popularTagsFeatureKey, popularTagsReducer),
    provideEffects(authEffects, feedEffects, popularTagsEffects, addToFavoritesEffect),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    // AddToFavoritesService,
  ],
};
