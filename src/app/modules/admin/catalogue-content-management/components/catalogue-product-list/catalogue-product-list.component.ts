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
  selector: 'app-catalogue-product-list',
  templateUrl: './catalogue-product-list.component.html',
  styleUrls: ['./catalogue-product-list.component.scss']
})
export class CatalogueProductListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: false }) matPaginator: MatPaginator;

  displayedColumns: string[] = [
    'selected_product_sku_id',
    'sku_id',
    'catalog_name'
  ];
  getCatalogueProductList$ = this._store.pipe(select(fromAdminSelectors.getCatalogueProductList$), filter(value => !!value));
  loading: boolean;
  paginationSizes: number[] = [5, 15, 30, 60, 100];
  defaultPageSize = this.paginationSizes[0];
  dataSource = new MatTableDataSource([]);
  filter = '';
  selectedRows = new MatTableDataSource([]);

  private _subscription: Subscription = new Subscription();


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
    this.loading = true;
    this._appFacade.clearMessages();
    this._adminService.authorizedAdmin('catalogue_management');
    const catalogIds = this.route.snapshot.queryParamMap.get('catalogIds');
    this._store.dispatch(fromAdminActions.getCatalogueProductList({ catalogueIds: catalogIds }));
    this._subscription.add(
      this.getCatalogueProductList$.subscribe((catalogueProductList) => {
        this.setTableDataSource(catalogueProductList);
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

  changed(event: any, id: number): void {
    const selectedProduct = this.dataSource.data.find(f => f.id === id);
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
    const selectedProducts = this.selectedRows.data.map(e => e.id).join(',');
    this.router.navigate(['admin/catalogue-content-management/edit'], { queryParams: { productIds: selectedProducts } });
  }

}
