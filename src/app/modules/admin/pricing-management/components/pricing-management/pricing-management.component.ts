import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { IAdminDetails } from '@yaari/models/auth/auth.interface';
import { AdminService } from '@yaari/services/admin/admin.service';
import { AuthService } from '@yaari/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppFacade, IAppState } from '~app/store/app.state';
import * as fromAuthSelectors from '~store/auth/auth.selectors';


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
    private _store: Store<IAppState>
  ) { }

  menus: any = [];
  hide: boolean
  clicked: number;

  public adminDetails$ = this._store.pipe(
    select(fromAuthSelectors.adminDetails$),
    filter(details => !!details),
  );
  ngOnInit(): void {
    this._appFacade.clearMessages();
    
    this.adminDetails$.subscribe((adminDetails: IAdminDetails)=>{
      this._adminService.authorizedAdmin('pricing_management');
      if(adminDetails.admin_designation === 'associate'){
        this.hide = true;
      }
      this.menus = [
        { name: 'Update Pricing', link: 'update' }
      ];
    })
    
    
  }
  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
