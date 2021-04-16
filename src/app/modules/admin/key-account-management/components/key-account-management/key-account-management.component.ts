import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from '@yaari/services/admin/admin.service';
import { Subscription } from 'rxjs';
import { AppFacade } from '~app/store/app.state';

@Component({
  selector: 'app-key-account-management',
  templateUrl: './key-account-management.component.html',
  styleUrls: ['./key-account-management.component.scss']
})
export class KeyAccountManagementComponent implements OnInit, OnDestroy {

  private _subscription: Subscription = new Subscription();
  constructor(
    private _adminService: AdminService,
    private _appFacade: AppFacade
  ) { }

  ngOnInit(): void {
    this._appFacade.clearMessages();
    this._adminService.authorizedAdmin('key_account_management');
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
