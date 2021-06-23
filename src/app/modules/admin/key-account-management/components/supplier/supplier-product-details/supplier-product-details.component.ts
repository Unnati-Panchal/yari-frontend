import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';
import {IBulkUploadBasic, IQuery} from '@yaari/models/product/product.interface';
import {select, Store} from '@ngrx/store';
import {IAppState} from '~store/app.state';
import {filter} from 'rxjs/operators';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {ICatalog, IFilter, ISupplierList} from '@yaari/models/admin/admin.interface';

import * as fromAdminActions from '~app/store/admin/admin.actions';
import * as fromAdminSelectors from '~app/store/admin/admin.selectors';

@Component({
  selector: 'app-supplier-product-details',
  templateUrl: './supplier-product-details.component.html',
  styleUrls: ['./supplier-product-details.component.scss']
})
export class SupplierProductDetailsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['sr_no', 'catalogue_name', 'supplier_business_name', 'catalogue_uploaded_by', 'catalogue_uploaded_date', 'category_name', 'catalogue_status'];
  selectedDate: IQuery;
  private _subscription: Subscription = new Subscription();
  public KAMCatalogList$ = this._store.pipe(select(fromAdminSelectors.KAMCatalogList$), filter(list => !!list));
  public isError$ = this._store.pipe(select(fromAdminSelectors.getIsError), filter(err => !!err));
  loading: boolean;
  submitted: boolean;
  public dataSource = new MatTableDataSource([]);
  selectedName: string;

  constructor(private _store: Store<IAppState>, private router: Router) { }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getCatalogList();
  }

  public viewBtn(): void {
    const query: IFilter = {
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
          console.log(KAMCatalogList);
          this.setTableDataSource(KAMCatalogList);
        })
    );
  }

  catalogueDetails(catalog: ICatalog): void {
    this.router.navigate([`admin/key-account-management/supplier-product-details/${catalog?.id}`]);
  }

  setTableDataSource(data: IBulkUploadBasic[]): void {
    this.dataSource = new MatTableDataSource<any>(data);
  }
}



