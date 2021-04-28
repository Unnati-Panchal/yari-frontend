import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '@yaari/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { AppFacade, IAppState } from '~app/store/app.state';

@Component({
  selector: 'app-key-account-management',
  templateUrl: './key-account-management.component.html',
  styleUrls: ['./key-account-management.component.scss']
})
export class KeyAccountManagementComponent implements OnInit, OnDestroy {

  private _subscription: Subscription = new Subscription();
  constructor(
    private _store: Store<IAppState>,
    private _appFacade: AppFacade,
    private _auth: AuthService,
    private _snackBar: MatSnackBar,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this._appFacade.clearMessages();
    this.authorizedAdmin();
  }

  public authorizedAdmin(): void {
    this._auth.adminDetails().subscribe(adminDetails => {
      // this.loading = false;
      if (adminDetails.admin_role !== 'key_account_management') {
        this._snackBar.open('Unauthorized Access', '', { duration: 3000 });
        this._router.navigate([`/admin/${adminDetails.admin_role.split('_').join('-')}`]);
      }
    });
  }
  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
