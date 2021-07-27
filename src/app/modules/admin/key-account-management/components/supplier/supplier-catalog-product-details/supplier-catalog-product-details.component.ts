import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';
import {IBulkUploadBasic, IQuery} from '@yaari/models/product/product.interface';
import {select, Store} from '@ngrx/store';
import {IAppState} from '~store/app.state';
import {filter} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {IProductDetail} from '@yaari/models/admin/admin.interface';

import * as fromAdminActions from '~app/store/admin/admin.actions';
import * as fromAdminSelectors from '~app/store/admin/admin.selectors';
import {Location} from '@angular/common';

@Component({
  selector: 'app-supplier-catalog-product-details',
  templateUrl: './supplier-catalog-product-details.component.html',
  styleUrls: ['./supplier-catalog-product-details.component.scss']
})
export class SupplierCatalogProductDetailsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [];
  firstGroupColumns: string[] = [
    'product_name',
    'sku_id'
  ];
  secondGroupColumns: string[] = [
    'product_status',
    'key_features',
    'description',
    'material_care',
    'hsn_code',
    'offer',
    'group_id',
    'product_id',
    'guarantee',
    'warranty',
    'size_chart',
    'color_chart',
    'mrp',
    'stock_count',
    're_stock_date',
    'images'
  ];
  specKeys: string[] = [];
  selectedDate: IQuery;
  private _subscription: Subscription = new Subscription();
  public KAMProductDetails$ = this._store.pipe(select(fromAdminSelectors.KAMProductDetails$), filter(list => !!list));
  public isError$ = this._store.pipe(select(fromAdminSelectors.getIsError), filter(err => !!err));
  loading: boolean;
  public dataSource = new MatTableDataSource([]);
  selectedCatalogName: string;
  selectedName: string;
  KAMProductDetails: IProductDetail[];
  filteredKAMProductDetails: IProductDetail[];

  constructor(private _store: Store<IAppState>, private router: Router, private route: ActivatedRoute, private _location: Location) { }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loading = true;
    const catalogId = this.route.snapshot.paramMap.get('id');
    this.selectedCatalogName = this.route.snapshot.paramMap.get('name');
    this._store.dispatch(fromAdminActions.getProductsByCatalogId({catalogId: Number(catalogId)}));
    this.getCatalogList();
  }

  public backBtn(): void {
    this._location.back();
  }

  public viewBtn(): void {
    if (this.selectedName) {
      this.filteredKAMProductDetails = this.KAMProductDetails.filter(item => item.sku_id.includes(this.selectedName));
    } else {
      this.filteredKAMProductDetails = this.KAMProductDetails;
    }
    this.setTableDataSource(this.filteredKAMProductDetails);
  }

  getCatalogList(): void {
    this._subscription.add(
      combineLatest([this.KAMProductDetails$])
        .subscribe(([KAMProductDetails]) => {
          this.loading = false;
          this.specKeys = [...new Set(Object.keys(KAMProductDetails[0].specifications))];
          const columns = [...this.firstGroupColumns, ...this.specKeys.map(key => key.toLowerCase()), ...this.secondGroupColumns];
          this.displayedColumns = [...new Set(columns)];
          this.KAMProductDetails = KAMProductDetails;
          this.filteredKAMProductDetails = this.KAMProductDetails;
          this.setTableDataSource(KAMProductDetails);
        })
    );
  }

  setTableDataSource(data: IBulkUploadBasic[]): void {
    this.dataSource = new MatTableDataSource<any>(data);
  }
}



