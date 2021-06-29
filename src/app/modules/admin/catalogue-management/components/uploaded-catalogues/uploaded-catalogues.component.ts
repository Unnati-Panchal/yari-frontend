import * as fileSaver from 'file-saver';
import * as fromAdminActions from '~app/store/admin/admin.actions';
import * as fromAdminSelectors from '~app/store/admin/admin.selectors';

import {AppFacade, IAppState} from '~app/store/app.state';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';

import {AdminService} from '@yaari/services/admin/admin.service';
import {IUploadedCatalogue} from '@yaari/models/admin/admin.interface';
import {MatTableDataSource} from '@angular/material/table';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-uploaded-catalogues',
  templateUrl: './uploaded-catalogues.component.html',
  styleUrls: ['./uploaded-catalogues.component.scss']
})
export class UploadedCataloguesComponent implements OnInit, OnDestroy {

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator, {static: false}) matPaginator: MatPaginator;

  paginationSizes: number[] = [5, 15, 30, 60, 100];
  defaultPageSize = this.paginationSizes[0];

  isLoading$ = this._store.pipe(select(fromAdminSelectors.getIsLoading));

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

  dataSource: MatTableDataSource<any[]>;
  allData = [];
  filter = '';
  private _subscription: Subscription = new Subscription();

  public getIsError$ = this._store.pipe(
    select(fromAdminSelectors.getIsError));

  public uploadedCatalogues$ = this._store.pipe(
    select(fromAdminSelectors.getUploadedCatalogues),
    filter(details => !!details)
  );
  ngOnInit(): void {
    this._appFacade.clearMessages();
    this._adminService.authorizedAdmin('catalogue_management');
    this.getUploadedCatalogues();
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getUploadedCatalogues(): void {
    this._store.dispatch(fromAdminActions.getUploadedCatalogues());
    this._subscription.add(this.uploadedCatalogues$.subscribe(res => {
      this.allData = res;
      this.dataSource = new MatTableDataSource(this.allData);
      setTimeout(() => {
        this.dataSource.paginator = this.matPaginator;
        this.dataSource.sort = this.sort;
      });
    }));
  }

  downloadCatalogueExcel(catalogue: IUploadedCatalogue): void {
    this._subscription.add(this._adminService.getCatalogueDownload(+catalogue.catalogue_id).subscribe(res => {
      const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fileSaver.saveAs(blob, `${catalogue.catalogue_name}.xlsx`);
    }));
  }
}
