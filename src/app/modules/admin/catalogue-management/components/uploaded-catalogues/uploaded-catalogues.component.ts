import * as fileSaver from 'file-saver';
import * as fromAdminActions from '~app/store/admin/admin.actions';
import * as fromAdminSelectors from '~app/store/admin/admin.selectors';

import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AppFacade, IAppState } from '~app/store/app.state';
import { Store, select } from '@ngrx/store';

import { AdminService } from '@yaari/services/admin/admin.service';
import { IUploadedCatalogue } from '@yaari/models/admin/admin.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-uploaded-catalogues',
  templateUrl: './uploaded-catalogues.component.html',
  styleUrls: ['./uploaded-catalogues.component.scss']
})
export class UploadedCataloguesComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator, { static: false }) matPaginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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
  paginationSizes: number[] = [5, 15, 30, 60, 100];
  defaultPageSize = this.paginationSizes[0];
  dataSource: MatTableDataSource<IUploadedCatalogue> = new MatTableDataSource<IUploadedCatalogue>();
  allData: IUploadedCatalogue[] = [];
  filter = '';
  isLoading = true;

  constructor(
    private _store: Store<IAppState>,
    private _adminService: AdminService,
    private _appFacade: AppFacade
  ) { }

  private _subscription: Subscription = new Subscription();

  getIsError$ = this._store.pipe(
    select(fromAdminSelectors.getIsError));

  uploadedCatalogues$ = this._store.pipe(
    select(fromAdminSelectors.getUploadedCatalogues),
    filter(details => !!details)
  );

  ngOnInit(): void {
    this._appFacade.clearMessages();
    this._adminService.authorizedAdmin('catalogue_management');
    this.getUploadedCatalogues();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.matPaginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getUploadedCatalogues(): void {
    this._store.dispatch(fromAdminActions.getUploadedCatalogues());
    this._subscription.add(this.uploadedCatalogues$.subscribe(res => {
      this.allData = res;
      this.dataSource.data = this.allData;
      this.isLoading = false;
    }));
  }

  downloadCatalogueExcel(catalogue: IUploadedCatalogue): void {
    this._subscription.add(this._adminService.getCatalogueDownload(+catalogue.catalogue_id).subscribe(res => {
      const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fileSaver.saveAs(blob, `${catalogue.catalogue_name}.xlsx`);
    }));
  }
}
