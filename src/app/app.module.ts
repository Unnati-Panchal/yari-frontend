import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {environment} from '~env/environment';

import {ActionReducerMap, StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {routerReducer, RouterState, StoreRouterConnectingModule} from '@ngrx/router-store';

import {IAppState} from '~store/app.state';
import {AuthEffects} from '~store/auth/auth.effects';
import * as fromAuth from '~store/auth/auth.reducer';

import {AppComponent} from '~app/app.component';
import {AppRoutingModule} from '~app/app-routing.module';

const reducers: ActionReducerMap<IAppState> = {
  ['router']: routerReducer,
  [fromAuth.authFeatureKey]: fromAuth.reducer
};

const effects = [
  AuthEffects,
];

export function getReducers(): ActionReducerMap<IAppState> {
  return reducers;
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot(
      {...getReducers()},
      {
        metaReducers: [fromAuth.clearState],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true
        }
      }
    ),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal
    }),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
