import * as _ from 'lodash';
import * as fromAdminActions from '~app/store/admin/admin.actions';
import * as fromAdminSelectors from '~app/store/admin/admin.selectors';

import {ActivatedRoute, Router} from '@angular/router';
import {AppFacade, IAppState} from '~app/store/app.state';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';

import {AdminService} from '@yaari/services/admin/admin.service';
import {ICatalogueManagementCountFilter, IFilter} from '@yaari/models/admin/admin.interface';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {combineLatest, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {MatSort} from '@angular/material/sort';
import {HttpPaginatedDataSource} from '~admin/view-catalogue/components';

@Component({
  selector: 'app-catalogue-content-list',
  templateUrl: './catalogue-content-list.component.html',
  styleUrls: ['./catalogue-content-list.component.scss']
})
export class CatalogueContentListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, {static: false}) matPaginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'selected_product_sku_id',
    'catalogue_name',
    'supplier_business_name',
    'category_name',
    'product_count',
    'catalogue_status',
    'catalogue_uploaded_by',
    'catalogue_uploaded_date',
    'action_by',
    'action_date',
    'content_updated_by',
    'content_updated_date'
  ];

  isLoading$ = this._store.pipe(select(fromAdminSelectors.getIsLoading));

  getCatalogueContentManagements$ = this._store.pipe(select(fromAdminSelectors.getCataloguesContentManagements$), filter(value => !!value));

  getIsError$ = this._store.pipe(select(fromAdminSelectors.getIsError));

  catalogueManagementCount$ = this._store.pipe(select(fromAdminSelectors.catalogueManagementCount$));

  filter: '';
  dataSource = new HttpPaginatedDataSource([]);
  paginationSizes: number[] = [5, 15, 30, 60, 100];
  pageSize = 5;
  currentPage = 0;
  totalCount = 0;
  selectedRows = new HttpPaginatedDataSource([]);

  private _subscription: Subscription = new Subscription();
  selectedCatalogId: string;

  constructor(
    private _store: Store<IAppState>,
    private _adminService: AdminService,
    private _appFacade: AppFacade, private router: Router,
    private route: ActivatedRoute
  ) {
  }



  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.has('id')) {
      {
        this.selectedCatalogId = this.route.snapshot.queryParamMap.get('id');
      }
    }
    this._appFacade.clearMessages();
    this._adminService.authorizedAdmin('catalogue_management');

    this._store.dispatch(fromAdminActions.getCatalogueContentManagements({
      filter: {
        skip: 0,
        limit: this.pageSize,
        fetch_type: 'catalogue_content_management',
      }
    }));

    this._store.dispatch(fromAdminActions.getCatalogueManagementCount({
      filter: {
        count_type: 'catalogue_content_management',
      } as ICatalogueManagementCountFilter
    }));


    this._subscription.add(
      combineLatest([this.getCatalogueContentManagements$, this.catalogueManagementCount$])
        .subscribe(([catalogueContentManagements, count]) => {
          this.dataSource = new HttpPaginatedDataSource<any>(catalogueContentManagements);
          this.totalCount = count;
        })
    );

    setTimeout(() => {
      this.dataSource.paginator = this.matPaginator;
      this.dataSource.sort = this.sort;
    });
  }


  public applyFilter(filterValue: string): void {
    this._store.dispatch(fromAdminActions.getCatalogueContentManagements({
      filter: {
        skip: 0,
        limit: this.pageSize,
        fetch_type: 'catalogue_content_management',
        filter_by: filterValue
      } as IFilter
    }));

    this._store.dispatch(fromAdminActions.getCatalogueManagementCount({
      filter: {
        count_type: 'catalogue_content_management',
        filter_by: filterValue
      } as ICatalogueManagementCountFilter
    }));
  }

  changed(event: any, catalogueId: number): void {
    const selectedProduct = this.dataSource.data.find(f => f.catalogue_id === catalogueId);
    if (!selectedProduct) {
      return;
    }
    if (event.checked) {
      this.selectedRows.data.push(selectedProduct);
    } else {
      _.remove(this.selectedRows.data, selectedProduct);
    }
  }

  nagivateToEdit(): void {
    const selectedCatalogues = this.selectedRows.data.map(e => e.catalogue_id).join(',');
    this.router.navigate(['admin/catalogue-content-management/products'], {queryParams: {catalogIds: selectedCatalogues}});
  }

  change(pageEvent: PageEvent) {
    this.currentPage = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    let skip = pageEvent.pageIndex * pageEvent.pageSize;
    if (skip < 0) {
      skip = 0;
    }
    this._store.dispatch(fromAdminActions.getCatalogueContentManagements({
      filter: {
        skip: skip,
        limit: this.pageSize,
        fetch_type: 'catalogue_content_management',
        filter_by: this.filter || '',
      } as IFilter
    }));
  }
}
