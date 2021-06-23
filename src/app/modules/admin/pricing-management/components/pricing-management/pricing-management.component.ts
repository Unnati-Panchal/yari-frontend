import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IAdminDetails } from '@yaari/models/auth/auth.interface';
import { AdminService } from '@yaari/services/admin/admin.service';
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
    private _snackbar: MatSnackBar
  ) { }

  menus: any = [
    { name: 'Update Pricing', link: 'update' }
  ];
  clicked: number;
  ngOnInit(): void {
    this._appFacade.clearMessages();
    this._adminService.authorizedAdmin('pricing_management');
    this._authService.adminDetails().subscribe((adminDetails: IAdminDetails)=>{
      if(adminDetails.admin_designation === 'associate'){
        this._authService.logoutService().subscribe(res=>res);
        this._authService.logoutAdmin();
        this._snackbar.open('Unauthorized access', '', { duration: 5000 });
      }
    })
  }
  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
