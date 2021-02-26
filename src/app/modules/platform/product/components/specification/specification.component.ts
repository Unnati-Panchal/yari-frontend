import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import * as fromProductsActions from '~store/products/products.actions';
import {select, Store} from '@ngrx/store';
import {IAppState} from '~store/app.state';
import * as fromProductsSelectors from '~store/products/products.selectors';
import {filter, tap} from 'rxjs/operators';
import {IBulkUploadBasic, ICatalogProducts, IQuery, ISpecifications} from '@yaari/models/product/product.interface';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as moment from 'moment';
import {Utilities} from '@yaari/utils/utlis';

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
  specKeys: string[];
  dataSource: ICatalogProducts[];
  loading: boolean;
  submitBtnLoading: boolean;
  selectedDate: IQuery;
  catalogueList: IBulkUploadBasic[];
  isSelectedCatalogue: number;
  selectDate: string;

  private _subscription: Subscription = new Subscription();
  public getCatalogProducts$ = this._store.pipe(
    select(fromProductsSelectors.getCatalogProducts$),
    filter(catalogs => !!catalogs?.length)
  );
  public isMsg$ = this._store.pipe(
    select(fromProductsSelectors.getIsMsg),
    filter(msg => !!msg),
    tap(() => this.submitBtnLoading = false)
  );
  public isError$ = this._store.pipe(
    select(fromProductsSelectors.getIsError),
    filter(error => !!error),
    tap(() => this.submitBtnLoading = false)
  );
  public getCatalogues$ = this._store.pipe(select(fromProductsSelectors.getCatalogs), filter(catalogs => !!catalogs));

  constructor(private _store: Store<IAppState>, private _snackBar: MatSnackBar) { }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getCataloguesRes();

    this._subscription.add(
      this.range.valueChanges.subscribe( range => {
        const start = moment(range.start)?.format('YYYY-MM-DD');
        const end = moment(range.end)?.format('YYYY-MM-DD');
        if (start && end && start !== 'Invalid date' && end !== 'Invalid date') {
          this.selectedDate = {startDate: start, endDate: end};
        }
      })
    );
  }

  getCataloguesRes(): void {
    this._subscription.add(
      this.getCatalogProducts$.subscribe((response) => {
        this.specKeys = Object.keys(response[0]?.specifications);
        this.displayedColumns = ['sr_no', 'sku_id', 'product_name', ...this.specKeys, 'next_day_dispatch'];
        this.dataSource = response.map( (item) => {
          return {
            ...item,
            specDetails: Object.values(item.specifications)
          };
        });
        this.loading = false;
      })
    );

    this._subscription.add(
      this.getCatalogues$.subscribe((list) => this.catalogueList = list)
    );
  }

  backToCatalogueList(): void {
    this.isSelectedCatalogue = 0;
  }

  submit(): void {
    this.submitBtnLoading = true;
    const specifications = this.dataSource.map( (item: any) => {
      return {
        id: item.id,
        sku_id: item.sku_id,
        next_day_dispatch: item?.next_day_dispatch,
        product_name: item?.product_name,
        specifications: Utilities.mapKeyValues(this.specKeys, item)
      };
    });
    const spec: ISpecifications = {
      catalog_id: '1',
      details: specifications
    };
    this._store.dispatch(fromProductsActions.editSpecifications({spec}));
  }

  public viewCatalogueList(): void {
    const query = this.selectedDate;
    this.selectDate = null;
    if (!query || !query?.startDate || !query?.endDate) {
      this.selectDate = 'Please Select Date Range!';
      return;
    }
    this._store.dispatch(fromProductsActions.getCatalogs({query}));
  }

  addSpecifications(catalogueId: number): void {
    this.isSelectedCatalogue = catalogueId;
    this.loading = true;
    const catalogId = catalogueId.toString();
    this._store.dispatch(fromProductsActions.getCatalogProducts({catalogId}));

  }

  deleteCatalogue(catalogueId: number): void {
    const catalogId = catalogueId.toString();
    this._store.dispatch(fromProductsActions.deleteCatalog({catalogId}));
    setTimeout(() => this.viewCatalogueList(), 3000);
  }

}
