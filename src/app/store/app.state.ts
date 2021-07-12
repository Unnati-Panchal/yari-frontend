import {Injectable} from '@angular/core';
import * as fromProductsActions from '~store/products/products.actions';
import * as fromAuthActions from '~store/auth/auth.actions';
import * as fromProfileActions from '~store/profile/profile.actions';
import {Store} from '@ngrx/store';
import * as fromAdminActions from '~store/admin/admin.actions';

// tslint:disable-next-line:no-empty-interface
export interface IAppState {}


@Injectable()
export class AppFacade {

  clearMessages(): void {
    this._store.dispatch(fromProductsActions.clearMessages());
    this._store.dispatch(fromAuthActions.clearMessages());
    this._store.dispatch(fromProfileActions.clearMessages());
    this._store.dispatch(fromAdminActions.clearMessages());
  }

  constructor(private _store: Store<IAppState>) {
  }
}
