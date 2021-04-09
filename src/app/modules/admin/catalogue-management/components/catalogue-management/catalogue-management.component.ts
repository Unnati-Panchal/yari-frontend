import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AuthService } from '@yaari/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { AppFacade, IAppState } from '~app/store/app.state';
import * as fromAuthActions from '~store/auth/auth.actions';
import * as fromAuthSelectors from '~store/auth/auth.selectors';
import * as fromProfileActions from '~store/profile/profile.actions';

@Component({
  selector: 'app-catalogue-management',
  templateUrl: './catalogue-management.component.html',
  styleUrls: ['./catalogue-management.component.scss']
})
export class CatalogueManagementComponent implements OnInit, OnDestroy {

  public token$ = this._store.pipe(
    select(fromAuthSelectors.getToken),
    filter(token => !!token)
  );
  public isError$ = this._store.pipe(
    select(fromAuthSelectors.getIsError),
    tap(() => this.loading = false)
  );

  public adminDetails$ = this._store.pipe(
    select(fromAuthSelectors.adminDetails$),
    filter(details => !!details),
  );

  public hide: boolean;
  public loading: boolean;
  private _subscription: Subscription = new Subscription();
  constructor(
    private _store: Store<IAppState>,
    private _appFacade: AppFacade,
    private _auth: AuthService,
    private _snackBar: MatSnackBar
  ) { }

  menus: any = [
    { name: 'Catalogue Upload', link: 'upload' },
    { name: 'Catalogue Content Management', link: 'admin/login' },
    { name: 'Catalogue Quality Scorecard', link: 'auth/login' }
  ];
  clicked: number;
  ngOnInit(): void {
    this._appFacade.clearMessages();
    this.authorizedAdmin();
  }

  public authorizedAdmin(): void {
    this._subscription.add(this.token$.subscribe((token) => {
      this._auth.accessToken = token.access_token;
      this._store.dispatch(fromAuthActions.adminDetails());
    }));

    this._subscription.add(this.adminDetails$.subscribe((adminDetails) => {
      this.loading = false;
      if (adminDetails.admin_role !== 'catalogue_management') {
        this._snackBar.open('Unauthorized Access', '', { duration: 3000 });
      }
    }));
  }
  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}
