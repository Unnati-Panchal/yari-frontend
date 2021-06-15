import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppFacade, IAppState} from '~store/app.state';
import {AdminService} from '@yaari/services/admin/admin.service';
import * as fromAdminActions from '~store/admin/admin.actions';

@Injectable()
export class ProductCategoryResolver implements Resolve<null> {
  constructor(
    private _store: Store<IAppState>,
    private _adminService: AdminService,
    private _appFacade: AppFacade,
  ) {
  }

  // @ts-ignore
  // tslint:disable-next-line:typedef
  resolve(route: ActivatedRouteSnapshot) {
    return this._store.dispatch(fromAdminActions.getCategoryProducts({catalogueId: route.params.id}));
  }
}
