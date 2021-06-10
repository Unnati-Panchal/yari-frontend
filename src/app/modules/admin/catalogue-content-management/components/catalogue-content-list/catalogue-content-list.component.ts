import * as _ from 'lodash';
import * as fromAdminActions from '~app/store/admin/admin.actions';
import * as fromAdminSelectors from '~app/store/admin/admin.selectors';

import { ActivatedRoute, Router } from '@angular/router';
import { AppFacade, IAppState } from '~app/store/app.state';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { AdminService } from '@yaari/services/admin/admin.service';
import { ICatalogueContentManagement } from '@yaari/models/admin/admin.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-catalogue-content-list',
  templateUrl: './catalogue-content-list.component.html',
  styleUrls: ['./catalogue-content-list.component.scss']
})
export class CatalogueContentListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: false }) matPaginator: MatPaginator;

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
  getCatalogueContentManagements$ = this._store.pipe(select(fromAdminSelectors.getCataloguesContentManagements$), filter(value => !!value));
  loading: boolean;
  paginationSizes: number[] = [5, 15, 30, 60, 100];
  defaultPageSize = this.paginationSizes[0];
  dataSource = new MatTableDataSource([]);
  filter = '';
  selectedRows = new MatTableDataSource([]);

  private _subscription: Subscription = new Subscription();
  selectedCatalogId: string;

  constructor(
    private _store: Store<IAppState>,
    private _adminService: AdminService,
    private _appFacade: AppFacade, private router: Router,
    private route: ActivatedRoute
  ) { }

  getIsError$ = this._store.pipe(
    select(fromAdminSelectors.getIsError));

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {

    if (this.route.snapshot.queryParamMap.has('id')) {
      {
        this.selectedCatalogId = this.route.snapshot.queryParamMap.get('id');
      }
    }


    this.loading = true;
    this._appFacade.clearMessages();
    this._adminService.authorizedAdmin('catalogue_management');
    this._store.dispatch(fromAdminActions.getCatalogueContentManagements());

    this._subscription.add(
      this.getCatalogueContentManagements$.subscribe((catalogueContentManagements) => {
        this.setTableDataSource(catalogueContentManagements);
        this.loading = false;
      })
    );
  }

  setTableDataSource(data: ICatalogueContentManagement[]): void {
    this.dataSource = new MatTableDataSource<any>(data);
    setTimeout(() => {
      this.dataSource.paginator = this.matPaginator;
    });
  }

  applyFilter(filterValue: string): void {
    this.loading = true;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    this.loading = false;
  }

  changed(event: any, catalogueId: number): void {
    const selectedProduct = this.dataSource.data.find(f => f.catalogue_id === catalogueId);
    if (!selectedProduct) {
      return;
    }
    if (event.checked) {
      this.selectedRows.data.push(selectedProduct);
    }
    else {
      _.remove(this.selectedRows.data, selectedProduct);
    }
  }

  nagivateToEdit(): void {

    const selectedCatalogues = this.selectedRows.data.map(e => e.catalogue_id).join(',');
    this.router.navigate(['admin/catalogue-content-management/products'], { queryParams: { catalogIds: selectedCatalogues } });
  }

}