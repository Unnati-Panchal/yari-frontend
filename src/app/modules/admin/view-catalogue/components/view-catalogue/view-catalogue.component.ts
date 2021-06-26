import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {select, Store} from '@ngrx/store';
import {AdminService} from '@yaari/services/admin/admin.service';
import {Subscription} from 'rxjs';
import {AppFacade, IAppState} from '~store/app.state';
import {IFilter, IUploadedCatalogue} from '@yaari/models/admin/admin.interface';
import * as fileSaver from 'file-saver';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import * as fromAdminSelectors from '~store/admin/admin.selectors';
import * as fromAdminActions from '~store/admin/admin.actions';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-view-catalogue',
  templateUrl: './view-catalogue.component.html',
  styleUrls: ['./view-catalogue.component.scss']
})
export class ViewCatalogueComponent implements OnInit, OnDestroy {

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator, {static: false}) matPaginator: MatPaginator;

  isLoading$ = this._store.pipe(select(fromAdminSelectors.getIsLoading));

  getViewCatalogues$ = this._store.pipe(
    select(fromAdminSelectors.getViewCatalogues$),
    filter(details => !!details)
  );

  dataSource = new MatTableDataSource([]);
  filter = '';
  private _subscription: Subscription = new Subscription();
  paginationSizes: number[] = [5, 15, 30, 60, 100];
  pageSize = 100;
  currentPage = 1;


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
    'category_name',
    'catalogue_status',
    'catalogue_uploaded_by',
    'catalogue_uploaded_date',
    'content_updated_by',
    'content_updated_date',
    'action_by',
    'action_date',
    'action',
  ];

  ngOnInit(): void {
    this._appFacade.clearMessages();
    this._adminService.authorizedAdmin('catalogue_management');

    this._store.dispatch(fromAdminActions.getViewCatalogues({
      filter: {
        skip: 0,
        limit: this.pageSize,
        fetch_type: 'view_catalogue',
      } as IFilter
    }));


    this._subscription.add(this.getViewCatalogues$.subscribe(viewCatalogues => {
      this.setTableDataSource(viewCatalogues);
    }));

  }

  setTableDataSource(data: IUploadedCatalogue[]): void {
    this.dataSource = new MatTableDataSource<any>(data);
    setTimeout(() => {
      this.dataSource.paginator = this.matPaginator;
      this.dataSource.sort = this.sort;
    });
  }



  public applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  downloadCatalogueExcel(catalogue: IUploadedCatalogue): void {
    this._subscription.add(this._adminService.getCatalogueDownload(+catalogue.catalogue_id).subscribe(res => {
      const blob = new Blob([res], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      fileSaver.saveAs(blob, `${catalogue.catalogue_name}.xlsx`);
    }));
  }

  getNextPaginationData = (next: boolean = true) => {
    let skip = 0;
    if (next) {
      this.currentPage += 1;
      skip = (this.currentPage - 1) * this.pageSize;
    } else {
      this.currentPage -= 1;
      skip = (this.currentPage - 1) * this.pageSize;
    }
    if (skip < 0) {
      skip = 0;
    }
    this._store.dispatch(fromAdminActions.getViewCatalogues({
      filter: {
        skip: skip,
        limit: this.pageSize,
        fetch_type: 'view_catalogue',
      } as IFilter
    }));

  };

}
