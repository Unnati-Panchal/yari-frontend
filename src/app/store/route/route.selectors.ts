import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import * as fromRoot from '~store/app.state';

export const routeFeatureKey = 'router';
export interface IRouterState extends fromRoot.IAppState {
  router: fromRouter.RouterReducerState;
}

export const selectRouter = createFeatureSelector<IRouterState, fromRouter.RouterReducerState>(routeFeatureKey);

export const {
  selectCurrentRoute,
  selectQueryParams,
  selectQueryParam,
  selectRouteParams,
  selectRouteParam,
  selectRouteData,
  selectUrl
} = fromRouter.getSelectors(selectRouter);

export const selectRouteOutletPath = createSelector(selectCurrentRoute, currentRoute =>
  currentRoute.routeConfig.outlet ? currentRoute.routeConfig.path : ''
);
