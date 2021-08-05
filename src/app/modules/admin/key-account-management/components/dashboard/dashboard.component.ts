import {Component, OnDestroy, OnInit} from '@angular/core';
import {resellerDashboardMenu, supplierDashboardMenu} from '~admin/key-account-management/components/dashboard/menu';
import {Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromAuthSelectors from '~store/auth/auth.selectors';
import {filter} from 'rxjs/operators';
import {IAppState} from '~store/app.state';
import {IAdminDetails} from '@yaari/models/auth/auth.interface';
import {AdminService, IMenuItem} from '@yaari/services/admin/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(
    private _store: Store<IAppState>,
    private adminService: AdminService
  ) {}

  public supplierDashboardMenu: IMenuItem[] = supplierDashboardMenu;
  public resellerDashboardMenu: IMenuItem[] = resellerDashboardMenu;
  public isResellerMenu = false;
  public isAuthorized: boolean;

  private _subscription = new Subscription();

  public adminDetails$ = this._store.pipe(
    select(fromAuthSelectors.adminDetails$),
    filter(details => !!details)
  );

  public ngOnInit(): void {
    const menu = [...supplierDashboardMenu, ...resellerDashboardMenu];
    this.adminService.activeHeaderMenu$.next(menu);
    this.authorizedAdmin();
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public isAssociateRole(adminDetails): boolean {
    return adminDetails.admin_designation === 'associate';
  }

  public isExecutiveRole(adminDetails): boolean {
    return adminDetails.admin_designation === 'executive';
  }

  public authorizedAdmin(): void {
    this._subscription.add(
      this.adminDetails$.subscribe((adminDetails: IAdminDetails) => {
        this.isAuthorized = !this.isAssociateRole(adminDetails) && !this.isExecutiveRole(adminDetails);
        this.disabledMenuItems(this.isAuthorized);
      })
    );
  }

  public disabledMenuItems(isAuthorized: boolean): void {
    this.supplierDashboardMenu = this.supplierDashboardMenu.map(item => {
      if (item.url.includes('supplier-onboarding-approval') && !isAuthorized) {
        item = {
          ...item,
          disabled: true
        };
      }
      return item;
    });
  }
}
