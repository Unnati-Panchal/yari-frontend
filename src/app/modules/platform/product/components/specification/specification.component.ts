import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import * as fromProductsActions from '~store/products/products.actions';
import {select, Store} from '@ngrx/store';
import {IAppState} from '~store/app.state';
import * as fromProductsSelectors from '~store/products/products.selectors';
import {filter} from 'rxjs/operators';
import {ISpecifications} from '@yaari/models/product/product.interface';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface IProductSpecs {
  sr_no?: string;
  item?: string;
  occasion?: string;
  neck_pattern?: string;
  sleeve_pattern?: string;
  itemLength?: string;
  hemline?: string;
  next_day_dispatch?: string;
}

@Component({
  selector: 'app-specification',
  templateUrl: './specification.component.html',
  styleUrls: ['./specification.component.scss']
})
export class SpecificationComponent implements OnInit, OnDestroy {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  displayedColumns: string[];
  description = {
    sku_id: 'SKU Number',
    next_day_dispatch: 'Next Day Dispatch'
  };
  dataSource: IProductSpecs[];
  loading: boolean;
  submitBtnLoading: boolean;

  private _subscription: Subscription = new Subscription();
  public getBulkSpecificationsUploadTemplate$ = this._store.pipe(
    select(fromProductsSelectors.getBulkSpecificationsUploadTemplate),
    filter(catalogs => !!catalogs?.length)
  );
  public isMsg$ = this._store.pipe(
    select(fromProductsSelectors.getIsMsg),
    filter(msg => !!msg)
  );
  public isError$ = this._store.pipe(
    select(fromProductsSelectors.getIsError),
    filter(error => !!error)
  );

  constructor(private _store: Store<IAppState>, private _snackBar: MatSnackBar) { }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loading = true;
    const catalogId = '1';
    this._store.dispatch(fromProductsActions.getBulkSpecificationsUploadTemplate({catalogId}));
    this.getCataloguesRes();
  }

  getCataloguesRes(): void {
    this._subscription.add(
      this.getBulkSpecificationsUploadTemplate$.subscribe((response) => {
        const columns = Object.values(response);
        this.displayedColumns = [...columns, 'sku_id', 'next_day_dispatch'];
        this.dataSource = [{}, {}, {}, {}, {}];
        this.loading = false;
      })
    );

    this._subscription.add(
      this.isMsg$.subscribe((msg) => {
        this._snackBar.open(msg, '', {duration: 3000});
        this.submitBtnLoading = false;
      })
    );

    this._subscription.add(
      this.isError$.subscribe((error) => {
        const msg = error.error.details[0].msg;
        this._snackBar.open(msg, '', {duration: 3000});
        this.submitBtnLoading = false;
      })
    );
  }

  submit(): void {
    this.submitBtnLoading = true;
    const specifications = this.dataSource.map( (item: any) => {
      return {
        sku_id: item?.sku_id ? item.sku_id : '',
        next_day_dispatch: item?.next_day_dispatch ? item.next_day_dispatch : false,
        specifications: item
      };
    });
    const spec: ISpecifications = {
      catalog_id: '1',
      details: specifications
    };
    this._store.dispatch(fromProductsActions.editSpecifications({spec}));
  }

}
