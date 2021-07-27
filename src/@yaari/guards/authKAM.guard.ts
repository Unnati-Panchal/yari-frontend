import { Injectable } from '@angular/core';
import { CanActivate, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AppFacade, IAppState } from '~store/app.state';
import { select, Store } from '@ngrx/store';
import * as fromAuthActions from '~store/auth/auth.actions';
import * as fromAuthSelectors from '~store/auth/auth.selectors';
import {IAdminDetails} from '@yaari/models/auth/auth.interface';

@Injectable()
export class AuthKAMGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _appFacade: AppFacade,
    private _store: Store<IAppState>,
  ) {
  }

  public adminDetails$ = this._store.pipe(
    select(fromAuthSelectors.adminDetails$),
    filter(details => !!details)
  );

  public isAssociateRole(adminDetails): boolean {
    return adminDetails.admin_designation === 'associate';
  }

  public isExecutiveRole(adminDetails): boolean {
    return adminDetails.admin_designation === 'executive';
  }

  public canActivate(): boolean {
    this._store.dispatch(fromAuthActions.adminDetails());

    this._router.events.pipe(filter(val => val instanceof NavigationEnd))
      .subscribe((val: NavigationEnd) => {
        this._appFacade.clearMessages();
        if (val.url === '/admin/key-account-management/supplier-onboarding-approval') {
          this.adminDetails$.subscribe((adminDetails: IAdminDetails) => {
            if (this.isAssociateRole(adminDetails) || this.isExecutiveRole(adminDetails)) {
              this._router.navigate([`/admin/key-account-management`]);
              return false;
            }
          });
        }

      });
    return true;
  }
}
