import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {combineLatest, Subscription} from 'rxjs';
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
  public getBulkUploadStatuses$ = this._store.pipe(select(fromProductsSelectors.getBulkUploadStatuses$));
  public isError$ = this._store.pipe(select(fromProductsSelectors.getIsError), filter(err => !!err));
  loading: boolean;
  submitted: boolean;
  selectDate: string;
  intervalSubscription;
  timerQuery;

  constructor(private _store: Store<IAppState>, private router: Router) { }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
    clearInterval(this.intervalSubscription);
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

    const sessionStoredData = JSON.parse(sessionStorage.getItem('catalogStatuses'));
    const availableTime = JSON.parse(sessionStorage.getItem('timerQuery'));
    if (sessionStoredData?.length) {
      this.dataSource = sessionStoredData;
      if (availableTime) {
        this.range.get('start').setValue(availableTime.startDate);
        this.range.get('end').setValue(availableTime.endDate);
      }
      this.loading = false;
    }
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
    this.timerQuery = query;
    sessionStorage.removeItem('timerQuery');
    sessionStorage.setItem('timerQuery', JSON.stringify(this.timerQuery));
    this._store.dispatch(fromProductsActions.getCatalogs({query}));
    this._store.dispatch(fromProductsActions.getBulkUploadStatuses());

    if (this.intervalSubscription) {
      clearInterval(this.intervalSubscription);
    }
    this.startTimer();
  }

  startTimer(): void {
    this.intervalSubscription = setInterval( () => {
      this._store.dispatch(fromProductsActions.getBulkUploadStatuses());
      this._store.dispatch(fromProductsActions.getCatalogs({query: this.timerQuery}));
    }, 5000);
  }

  getCataloguesRes(): void {
    this._subscription.add(
      combineLatest([this.getCatalogues$, this.getBulkUploadStatuses$])
        .subscribe(([catalogs, statuses]) => {
          this.allStatuses = statuses?.map( item => {
            return {...item, approved: null};
          });


          this.loading = false;
          let res = [...catalogs];
          res = res.filter( item => item.approved === true || item.approved === false);
          res = res.sort( (a, b) =>  (a.catalog_name).localeCompare(b.catalog_name));
          let currentStatuses = [];
          if (this.allStatuses?.length) {
            currentStatuses = [...this.allStatuses];
          }
          currentStatuses = currentStatuses.filter( item => !item.status.toLowerCase().includes('successfully') &&
            !item.status.toLowerCase().includes('invalid') &&
            !item.status.toLowerCase().includes('creating')
          );
          currentStatuses = currentStatuses.sort( (a, b) =>  (a.catalog_name).localeCompare(b.catalog_name));
          const displayed = res.concat(currentStatuses);
          sessionStorage.removeItem('catalogStatuses');
          sessionStorage.setItem('catalogStatuses', JSON.stringify(displayed));
          this.dataSource = displayed;
        })
    );
  }

  displayRejectedCatalogue(catalogue: IBulkUploadBasic): void {
    this.router.navigate([`app/product/catalogue-details/${catalogue.catalog_name}`]);
  }

}
