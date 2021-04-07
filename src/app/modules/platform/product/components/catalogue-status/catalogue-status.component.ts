import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import * as moment from 'moment';
import {IBulkUploadBasic, IBulkUploadStatus, IQuery} from '@yaari/models/product/product.interface';
import * as fromProductsActions from '~store/products/products.actions';
import {select, Store} from '@ngrx/store';
import {IAppState} from '~store/app.state';
import * as fromProductsSelectors from '~store/products/products.selectors';
import {filter} from 'rxjs/operators';
import {Router} from '@angular/router';

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
  private allStatuses: IBulkUploadStatus[];
  public getCatalogues$ = this._store.pipe(select(fromProductsSelectors.getCatalogs), filter(catalogs => !!catalogs));
  public getBulkUploadStatuses$ = this._store.pipe(select(fromProductsSelectors.getBulkUploadStatuses$),
    filter(statuses => !!statuses?.length));
  public isError$ = this._store.pipe(select(fromProductsSelectors.getIsError), filter(err => !!err));
  loading: boolean;
  submitted: boolean;
  selectDate: string;

  constructor(private _store: Store<IAppState>, private router: Router) { }

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

    this._store.dispatch(fromProductsActions.getBulkUploadStatuses());
  }

  public viewBtn(): void {
    const query = this.selectedDate;
    this.selectDate = null;
    if (!query || !query?.startDate || !query?.endDate) {
      this.selectDate = 'Please Select Date Range!';
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
        this.dataSource = response.concat(this.allStatuses);
      })
    );

    this._subscription.add(
      this.getBulkUploadStatuses$.subscribe((response) => this.allStatuses = response.map( item => {
        return {
          ...item,
          approved: null
        };
      }))
    );
  }

  displayRejectedCatalogue(catalogue: IBulkUploadBasic): void {
    console.log(this.allStatuses);
    // TODO find the catalogue by what. Please add an id
    // TODO what if there is no info yet, when I get the catalogue statuses
    const taskId = '5352068a-a4dd-45bf-927c-322b3f2c60af';
    this.router.navigate([`app/product/catalogue-details/${taskId}`]); /*catalogue.task_id*/
  }

}
