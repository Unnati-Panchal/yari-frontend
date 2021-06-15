import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromAuthSelectors from '~store/auth/auth.selectors';
import {tap} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {AppFacade, IAppState} from '~store/app.state';
import {AdminService} from '@yaari/services/admin/admin.service';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss']
})
export class CategoryManagementComponent implements OnInit, OnDestroy {


  public hide: boolean;
  public loading: boolean;
  public isError$ = this._store.pipe(
    select(fromAuthSelectors.getIsError),
    tap(() => this.loading = false)
  );
  menus: any = [
    {name: 'View Catalogue', link: './view-catalogue'},
    {name: 'Best Sellers', link: './best-sellers'},
    {name: 'Set Best Offers-Deals', link: './set-best-offers-deals'},
    {name: 'Set Seasonal Collection', link: './set-seasonal-collection'},
  ];
  clicked: number;
  private _subscription: Subscription = new Subscription();

  constructor(
    private _store: Store<IAppState>,
    private _appFacade: AppFacade,
    private _adminService: AdminService
  ) {
  }

  ngOnInit(): void {
    this._appFacade.clearMessages();
    this._adminService.authorizedAdmin('category_management');
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}
