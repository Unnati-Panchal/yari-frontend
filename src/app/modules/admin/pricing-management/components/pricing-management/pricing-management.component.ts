import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IAdminDetails } from '@yaari/models/auth/auth.interface';
import {AdminService, IMenuItem} from '@yaari/services/admin/admin.service';
import { AuthService } from '@yaari/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { AppFacade } from '~app/store/app.state';


@Component({
  selector: 'app-pricing-management',
  templateUrl: './pricing-management.component.html',
  styleUrls: ['./pricing-management.component.scss']
})
export class PricingManagementComponent implements OnInit, OnDestroy {

  private _subscription: Subscription = new Subscription();
  constructor(
    private _appFacade: AppFacade,
    private _adminService: AdminService,
    private _authService: AuthService,
    private _snackbar: MatSnackBar,
  ) { }

  menu: IMenuItem[];
  hide: boolean;
  clicked: number;
  ngOnInit(): void {
    this._appFacade.clearMessages();
    this._adminService.authorizedAdmin('pricing_management');

    this._authService.adminDetails().subscribe((adminDetails: IAdminDetails) => {
      if (adminDetails.admin_designation === 'associate'){
        this.hide = true;
      }
      this.menu = [
        { label: 'Update Pricing', url: 'update' }
      ];
      this._adminService.activeHeaderMenu$.next(this.menu);
    });
  }
  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
