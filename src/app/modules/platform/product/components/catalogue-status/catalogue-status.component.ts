import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import * as moment from 'moment';
import {IBulkUploadBasic, IQuery} from '@yaari/models/product/product.interface';
import * as fromProductsActions from '~store/products/products.actions';
import {select, Store} from '@ngrx/store';
import {IAppState} from '~store/app.state';
import * as fromProductsSelectors from '~store/products/products.selectors';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-catalogue-status',
  templateUrl: './catalogue-status.component.html',
  styleUrls: ['./catalogue-status.component.scss']
})
export class CatalogueStatusComponent implements OnInit, OnDestroy {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  displayedColumns: string[] = ['sr_no', 'catalogue_id', 'type_of_product', 'date_uploaded', 'status', 'views', 'shares'];
  dataSource: IBulkUploadBasic[];
  selectedDate: IQuery;
  private _subscription: Subscription = new Subscription();
  public getCatalogues$ = this._store.pipe(select(fromProductsSelectors.getCatalogs), filter(catalogs => !!catalogs));
  loading: boolean;
  submitted: boolean;

  constructor(private _store: Store<IAppState>) { }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
    this._subscription.add(
      this.range.valueChanges.subscribe( range => {
        const start = moment(range.start)?.format('YYYY-MM-DD');
        const end = moment(range.end)?.format('YYYY-MM-DD');
        if (start && end && start !== 'Invalid date' && end !== 'Invalid date') {
          this.selectedDate = {startDate: start, endDate: end};
        }
      })
    );
    this.getCataloguesRes();
  }

  public viewBtn(): void {
    const query = this.selectedDate;
    if (!query || !query?.startDate || !query?.endDate) {
      this.range.get('end').setErrors({InvalidRange: true});
      this.range.updateValueAndValidity();
      return;
    }
    this.loading = true;
    this.submitted = true;
    this._store.dispatch(fromProductsActions.getCatalogs({query}));
  }

  getCataloguesRes(): void {
    this._subscription.add(
      this.getCatalogues$.subscribe((response) => {
        this.loading = false;
        this.dataSource = response;
      })
    );
  }

}
