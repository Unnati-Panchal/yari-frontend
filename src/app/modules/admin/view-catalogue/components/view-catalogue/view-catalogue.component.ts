import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { AdminService } from '@yaari/services/admin/admin.service';
import { Subscription } from 'rxjs';
import { AppFacade, IAppState } from '~store/app.state';
import * as fromAdminActions from '~store/admin/admin.actions';
import * as fromAdminSelectors from '~store/admin/admin.selectors';
import { IUploadedCatalogue } from '@yaari/models/admin/admin.interface';
import { filter } from 'rxjs/operators';
import * as fileSaver from 'file-saver';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-view-catalogue',
  templateUrl: './view-catalogue.component.html',
  styleUrls: ['./view-catalogue.component.scss']
})
export class ViewCatalogueComponent implements OnInit, OnDestroy {

  public loading: boolean;
  public dataSource = new MatTableDataSource([]);
  filter = '';
  private _subscription: Subscription = new Subscription();
  paginationSizes: number[] = [5, 15, 30, 60, 100];
  defaultPageSize = this.paginationSizes[0];
  @ViewChild(MatPaginator, { static: false }) matPaginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _store: Store<IAppState>,
    private _adminService: AdminService,
    private _appFacade: AppFacade
  ) { }

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
    this.loading = true;
    this._appFacade.clearMessages();
    this._adminService.authorizedAdmin('catalogue_management');

    this._subscription.add(
      this._adminService.getViewCatalogues().subscribe(viewCatalogues => {
        this.setTableDataSource(viewCatalogues);
        this.loading = false;
      })
    );
  }

  setTableDataSource(data: IUploadedCatalogue[]): void {
    this.dataSource = new MatTableDataSource<any>(data);
    setTimeout(() => {
      this.dataSource.paginator = this.matPaginator;
      this.dataSource.sort = this.sort;
    });
  }



  public applyFilter(filterValue: string): void {
    this.loading = true;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    this.loading = false;
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  downloadCatalogueExcel(catalogue: IUploadedCatalogue): void {
    this._subscription.add(this._adminService.getCatalogueDownload(+catalogue.catalogue_id).subscribe(res => {
      const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fileSaver.saveAs(blob, `${catalogue.catalogue_name}.xlsx`);
    }));
  }

}
