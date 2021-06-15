import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {select, Store} from '@ngrx/store';
import * as fromAdminSelectors from '~store/admin/admin.selectors';
import {MatTableDataSource} from '@angular/material/table';
import {Subscription} from 'rxjs';
import {AppFacade, IAppState} from '~store/app.state';
import {AdminService} from '@yaari/services/admin/admin.service';
import {ICatalogueContentManagement} from '@yaari/models/admin/admin.interface';
import {filter} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-view-product-category',
  templateUrl: './view-product-category.component.html',
  styleUrls: ['./view-product-category.component.scss']
})
export class ViewProductCategoryComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, {static: false}) matPaginator: MatPaginator;


  @Input() categoryName = 'ABC-123';

  displayedColumns: string[] = [
    'sku_id',
    'catalog_name'
  ];
  getCategoryProducts$ = this._store.pipe(select(fromAdminSelectors.getCategoryProducts$), filter(value => !!value));
  loading: boolean;
  paginationSizes: number[] = [5, 15, 30, 60, 100];
  defaultPageSize = this.paginationSizes[0];
  dataSource = new MatTableDataSource([]);
  filter = '';
  getIsError$ = this._store.pipe(
    select(fromAdminSelectors.getIsError));
  private _subscription: Subscription = new Subscription();

  constructor(
    private _store: Store<IAppState>,
    private _adminService: AdminService,
    private _appFacade: AppFacade,
    private route: ActivatedRoute
  ) {
  }


  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loading = true;
    this._appFacade.clearMessages();
    this._adminService.authorizedAdmin('category_management');
    this.categoryName = this.route.snapshot.params.name;
    this._subscription.add(
      this.getCategoryProducts$.subscribe((catalogueProductList) => {
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


}
