import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AdminService } from '@yaari/services/admin/admin.service';
import { AuthService } from '@yaari/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { AppFacade, IAppState } from '~app/store/app.state';
import * as fromAuthActions from '~store/auth/auth.actions';
import * as fromAuthSelectors from '~store/auth/auth.selectors';

@Component({
  selector: 'app-catalogue-management',
  templateUrl: './catalogue-management.component.html',
  styleUrls: ['./catalogue-management.component.scss']
})
export class CatalogueManagementComponent implements OnInit, OnDestroy {

  public isError$ = this._store.pipe(
    select(fromAuthSelectors.getIsError),
    tap(() => this.loading = false)
  );

  public hide: boolean;
  public loading: boolean;
  private _subscription: Subscription = new Subscription();
  constructor(
    private _store: Store<IAppState>,
    private _appFacade: AppFacade,
    private _auth: AuthService,
    private _snackBar: MatSnackBar,
    private _router: Router,
  ) { }

  menus: any = [
    { name: 'Approve Uploaded Catalogues', link: 'catalogues' },
    { name: 'Catalogue Content Management', link: 'admin/login' },
    { name: 'Catalogue Quality Scorecard', link: 'auth/login' }
  ];
  clicked: number;
  ngOnInit(): void {
    this._appFacade.clearMessages();
    this._store.dispatch(fromAuthActions.adminDetails());
    this.authorizedAdmin();
  }

  public authorizedAdmin(): void {
    this._auth.adminDetails().subscribe(adminDetails => {
      this.loading = false;
      if (adminDetails.admin_role !== 'catalogue_management') {
        this._snackBar.open('Unauthorized Access', '', { duration: 3000 });
        this._router.navigate([`/admin/${adminDetails.admin_role.split('_').join('-')}`]);
      }
    });
  }
  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}
