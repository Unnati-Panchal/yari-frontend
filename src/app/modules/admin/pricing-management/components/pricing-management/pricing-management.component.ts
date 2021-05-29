import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AdminService } from '@yaari/services/admin/admin.service';
import { Subscription } from 'rxjs';
import { AppFacade, IAppState } from '~app/store/app.state';
import * as fromAuthActions from '~store/auth/auth.actions';

@Component({
  selector: 'app-pricing-management',
  templateUrl: './pricing-management.component.html',
  styleUrls: ['./pricing-management.component.scss']
})
export class PricingManagementComponent implements OnInit, OnDestroy {

  private _subscription: Subscription = new Subscription();
  constructor(
    private _store: Store<IAppState>,
    private _appFacade: AppFacade,
    private _adminService: AdminService
  ) { }

  menus: any = [
    { name: 'Update Pricing', link: 'update' }
  ];
  clicked: number;
  ngOnInit(): void {
    this._appFacade.clearMessages();
    this._store.dispatch(fromAuthActions.adminDetails());
    this._adminService.authorizedAdmin('pricing_management');
  }
  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
