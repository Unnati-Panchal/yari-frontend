import * as fileSaver from 'file-saver';
import * as fromAdminActions from '~app/store/admin/admin.actions';
import * as fromAdminSelectors from '~app/store/admin/admin.selectors';

import {AppFacade, IAppState} from '~app/store/app.state';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';

import {AdminService} from '@yaari/services/admin/admin.service';
import {ICatalogueManagementCountFilter, IFilter, IUploadedCatalogue} from '@yaari/models/admin/admin.interface';
import {combineLatest, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {MatSort} from '@angular/material/sort';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {HttpPaginatedDataSource} from '~admin/view-catalogue/components';

@Component({
  selector: 'app-uploaded-catalogues',
  templateUrl: './uploaded-catalogues.component.html',
  styleUrls: ['./uploaded-catalogues.component.scss']
})
export class UploadedCataloguesComponent implements OnInit, OnDestroy {

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator, {static: false}) matPaginator: MatPaginator;


  isLoading$ = this._store.pipe(select(fromAdminSelectors.getIsLoading));

  catalogueManagementCount$ = this._store.pipe(select(fromAdminSelectors.catalogueManagementCount$));

  constructor(
    private _store: Store<IAppState>,
    private _adminService: AdminService,
    private _appFacade: AppFacade
  ) {
  }

  displayedColumns = [
    'catalogue_name',
    'product_count',
    'supplier_business_name',
    'action_by',
    'action_date',
    'content_updated_by',
    'content_updated_date',
    'action',
  ];

  filter: '';
  dataSource = new HttpPaginatedDataSource([]);
  paginationSizes: number[] = [5, 15, 30, 60, 100];
  pageSize = 5;
  currentPage = 0;
  totalCount = 0;
  private _subscription: Subscription = new Subscription();

  getIsError$ = this._store.pipe(select(fromAdminSelectors.getIsError));

  uploadedCatalogues$ = this._store.pipe(select(fromAdminSelectors.getUploadedCatalogues), filter(details => !!details));

  ngOnInit(): void {
    this._appFacade.clearMessages();
    this._adminService.authorizedAdmin('catalogue_management');

    this._store.dispatch(fromAdminActions.getUploadedCatalogues({
      filter: {
        skip: 0,
        limit: this.pageSize,
        fetch_type: 'approve_uploaded_catalogue',
      } as IFilter
    }));

    this._store.dispatch(fromAdminActions.getCatalogueManagementCount({
      filter: {
        count_type: 'approve_uploaded_catalogue',
      } as ICatalogueManagementCountFilter
    }));

    this._subscription.add(
      combineLatest([this.uploadedCatalogues$, this.catalogueManagementCount$])
        .subscribe(([uploadedCatalogues, count]) => {
          this.dataSource = new HttpPaginatedDataSource<any>(uploadedCatalogues);
          this.totalCount = count;
        })
    );

    setTimeout(() => {
      this.dataSource.paginator = this.matPaginator;
      this.dataSource.sort = this.sort;
    });
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public applyFilter(filterValue: string): void {
    this._store.dispatch(fromAdminActions.getUploadedCatalogues({
      filter: {
        skip: 0,
        limit: this.pageSize,
        fetch_type: 'approve_uploaded_catalogue',
        filter_by: filterValue
      } as IFilter
    }));
    this._store.dispatch(fromAdminActions.getCatalogueManagementCount({
      filter: {
        count_type: 'approve_uploaded_catalogue',
        filter_by: filterValue
      } as ICatalogueManagementCountFilter
    }));
  }


  downloadCatalogueExcel(catalogue: IUploadedCatalogue): void {
    this._subscription.add(this._adminService.getCatalogueDownload(+catalogue.catalogue_id).subscribe(res => {
      const blob = new Blob([res], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      fileSaver.saveAs(blob, `${catalogue.catalogue_name}.xlsx`);
    }));
  }

  change(pageEvent: PageEvent) {
    this.currentPage = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    let skip = pageEvent.pageIndex * pageEvent.pageSize;
    if (skip < 0) {
      skip = 0;
    }
    this._store.dispatch(fromAdminActions.getUploadedCatalogues({
      filter: {
        skip: skip,
        limit: this.pageSize,
        fetch_type: 'approve_uploaded_catalogue',
        filter_by: this.filter || '',
      } as IFilter
    }));
  }
}
