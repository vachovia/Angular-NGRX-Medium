import {Route} from '@angular/router';
import {SettingsComponent} from './components';
import {provideState} from '@ngrx/store';
import {settingsFeatureKey, settingsReducer} from './store';

export const routes: Route[] = [
  {path: '', component: SettingsComponent, providers: [provideState(settingsFeatureKey, settingsReducer)]},
];
