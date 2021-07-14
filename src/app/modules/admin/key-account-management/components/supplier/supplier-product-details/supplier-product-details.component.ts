import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';
import {IBulkUploadBasic, IQuery} from '@yaari/models/product/product.interface';
import {select, Store} from '@ngrx/store';
import {IAppState} from '~store/app.state';
import {filter} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {MatTableDataSource} from '@angular/material/table';
import {ICatalog, IFilter} from '@yaari/models/admin/admin.interface';
import * as fileSaver from 'file-saver';

import * as fromAdminActions from '~app/store/admin/admin.actions';
import * as fromAdminSelectors from '~app/store/admin/admin.selectors';
import {MatPaginator} from '@angular/material/paginator';
import {AdminService} from '@yaari/services/admin/admin.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Utilities} from '@yaari/utils/utlis';
import {MatSort, Sort} from '@angular/material/sort';

@Component({
  selector: 'app-supplier-product-details',
  templateUrl: './supplier-product-details.component.html',
  styleUrls: ['./supplier-product-details.component.scss']
})
export class SupplierProductDetailsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'sr_no',
    'catalogue_name',
    'supplier_business_name',
    'catalogue_uploaded_by',
    'catalogue_uploaded_date',
    'category_name',
    'catalogue_status',
    'actions'
  ];

  selectedDate: IQuery;
  private _subscription: Subscription = new Subscription();
  public KAMCatalogList$ = this._store.pipe(select(fromAdminSelectors.KAMCatalogList$), filter(list => !!list));
  public isError$ = this._store.pipe(select(fromAdminSelectors.getIsError), filter(err => !!err));
  loading: boolean;
  submitted: boolean;
  public dataSource = new MatTableDataSource([]);
  selectedName: string;
  paginationSizes: number[] = [5, 15, 30, 60, 100];
  defaultPageSize = this.paginationSizes[0];
  @ViewChild(MatPaginator, {static: false}) matPaginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) matSort: MatSort;
  sort: Sort;

  constructor(
    private _store: Store<IAppState>,
    private router: Router,
    private _location: Location,
    private _adminService: AdminService,
    private _snackBar: MatSnackBar,
    ) { }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getCatalogList();
    this.loadList('');
  }

  public backBtn(): void {
    this._location.back();
  }

  public viewBtn(): void {
    if (!this.selectedName) {
      this.openSnackBar('Please add catalogue uploaded or name');
      return;
    }
    this.loadList(this.selectedName);
  }

  public loadList(content: string): void {
    const query: IFilter = {
      filter_by: content?.trim()
    };
    this.loading = true;
    this.submitted = true;
    this._store.dispatch(fromAdminActions.getCatalogList({filter: query}));
  }

  getCatalogList(): void {
    this._subscription.add(
      combineLatest([this.KAMCatalogList$])
        .subscribe(([KAMCatalogList]) => {
          this.loading = false;
          this.setTableDataSource(KAMCatalogList);
        })
    );
  }

  catalogueDetails(catalog: ICatalog): void {
    this.router.navigate([`admin/key-account-management/supplier-product-details/${catalog.id}/${catalog.catalogue_name}`]);
  }

  setTableDataSource(data: IBulkUploadBasic[]): void {
    this.dataSource = new MatTableDataSource<any>(data);
    setTimeout( () => {
      this.dataSource.paginator = this.matPaginator;
      this.dataSource.sort = this.matSort;
    });
  }

  sortData(sort: Sort): any {
    this.sort = sort;
    const sortedData = Utilities.sortData(sort, this.dataSource.data);
    this.setTableDataSource(sortedData);
  }

  downloadProduct(catalogue: ICatalog): void {
    this._subscription.add(
      this._adminService.getCatalogueDownload(+catalogue.id).subscribe(res => {
      const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fileSaver.saveAs(blob, `${catalogue.catalogue_name}.xlsx`);
    })
    );
  }

  openSnackBar(msg): void {
    this._snackBar.open(msg, 'X', {duration: 5000});
  }
}



