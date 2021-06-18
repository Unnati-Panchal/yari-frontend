import * as fromAuthActions from '~store/auth/auth.actions';
import * as fromAuthSelectors from '~store/auth/auth.selectors';

import { AppFacade, IAppState } from '~app/store/app.state';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import { AdminService } from '@yaari/services/admin/admin.service';
import { Subscription } from 'rxjs';
import { AuthService } from '@yaari/services/auth/auth.service';
import { IAdminDetails } from '@yaari/models/auth/auth.interface';



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
    private _adminService: AdminService,
    private _auth: AuthService
  ) { }

  menus: any = [
    { name: 'Approve Uploaded Catalogues', link: 'catalogues' },
    { name: 'Catalogue Content Management', link: '../catalogue-content-management' },
    { name: 'View Catalogue' , link: '../view-catalogue'}
  ];
  clicked: number;
  ngOnInit(): void {
    this._appFacade.clearMessages();
    // this._store.dispatch(fromAuthActions.adminDetails());
    this._adminService.authorizedAdmin('catalogue_management');
    this._auth.adminDetails().subscribe((adminDetails: IAdminDetails) => {
      if(adminDetails.admin_designation == "associate"){
        this.menus = [
          { name: 'Approve Uploaded Catalogues', link: 'catalogues' },
          { name: 'View Catalogue' , link: '../view-catalogue'}
        ];
      }
    });
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}
