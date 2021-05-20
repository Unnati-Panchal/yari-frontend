import * as fromAdmin from '~store/admin/admin.reducer';
import * as fromAuth from '~store/auth/auth.reducer';
import * as fromProducts from '~store/products/products.reducer';
import * as fromProfile from '~store/profile/profile.reducer';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { AdminAuthGuard, AuthGuard } from '@yaari/guards/auth.guard';
import { AppFacade, IAppState } from '~store/app.state';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterState, StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { AdminEffects } from './store/admin/admin.effects';
import { AppComponent } from '~app/app.component';
import { AppRoutingModule } from '~app/app-routing.module';
import { AuthEffects } from '~store/auth/auth.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { ProductsEffects } from '~store/products/products.effects';
import { ProfileEffects } from '~store/profile/profile.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TermsAndConditionsComponent } from '~app/modules/terms-and-conditions/terms-and-conditions.component';
import { TokenInterceptor } from '@yaari/interceptors/token.interceptor';
import { environment } from '~env/environment';


const reducers: ActionReducerMap<IAppState> = {
  ['router']: routerReducer,
  [fromAuth.authFeatureKey]: fromAuth.reducer,
  [fromProducts.productFeatureKey]: fromProducts.reducer,
  [fromProfile.profileFeatureKey]: fromProfile.reducer,
  [fromAdmin.adminFeatureKey]: fromAdmin.reducer
};

const effects = [
  AuthEffects,
  ProductsEffects,
  ProfileEffects,
  AdminEffects
];

export function getReducers(): ActionReducerMap<IAppState> {
  return reducers;
}


@NgModule({
  declarations: [
    AppComponent,
    TermsAndConditionsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatSnackBarModule,
    NgxDocViewerModule,
    StoreModule.forRoot(
      { ...getReducers() },
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
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [
    AuthGuard,
    AdminAuthGuard,
    AppFacade,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
