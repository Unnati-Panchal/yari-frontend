import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {combineLatest, Subscription} from 'rxjs';
import * as moment from 'moment';
import {IBulkUploadBasic, IQuery} from '@yaari/models/product/product.interface';
import * as fromProductsActions from '~store/products/products.actions';
import {select, Store} from '@ngrx/store';
import {IAppState} from '~store/app.state';
import * as fromProductsSelectors from '~store/products/products.selectors';
import {filter} from 'rxjs/operators';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

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
  selectedDate: IQuery;
  private _subscription: Subscription = new Subscription();
  public getCatalogues$ = this._store.pipe(select(fromProductsSelectors.getCatalogs), filter(catalogs => !!catalogs));
  public isError$ = this._store.pipe(select(fromProductsSelectors.getIsError), filter(err => !!err));
  loading: boolean;
  submitted: boolean;
  selectDate: string;
  intervalSubscription;
  timerQuery;
  maxDate = new Date();
  paginationSizes: number[] = [5, 15, 30, 60, 100];
  defaultPageSize = this.paginationSizes[0];
  public dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator, {static: false}) matPaginator: MatPaginator;
  selectedCatalogueName: string;
  allCatalogs: IBulkUploadBasic[];
  displayedCatalogs: IBulkUploadBasic[];

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
      this.setTableDataSource(sessionStoredData);
      if (availableTime) {
        this.range.get('start').setValue(availableTime.startDate);
        this.range.get('end').setValue(availableTime.endDate);
      }
      this.loading = false;
    }
  }

  public searchByCatalogueName(): void {
    if (this.selectedCatalogueName) {
      this.displayedCatalogs = this.allCatalogs.filter(item => item?.catalog_name?.includes(this.selectedCatalogueName));
    } else {
      this.displayedCatalogs = this.allCatalogs;
    }
    this.setTableDataSource(this.displayedCatalogs);
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

    if (this.intervalSubscription) {
      clearInterval(this.intervalSubscription);
    }
    this.startTimer();
  }

  startTimer(): void {
    this.intervalSubscription = setInterval( () => {
      this._store.dispatch(fromProductsActions.getCatalogs({query: this.timerQuery}));
    }, 5000);
  }

  getCataloguesRes(): void {
    this._subscription.add(
      combineLatest([this.getCatalogues$])
        .subscribe(([catalogs]) => {
          this.loading = false;
          let res = [];
          if (catalogs?.length) {
            const filteredCatalogs = [...catalogs].filter(item => !!item.catalog_name);
            res = [...filteredCatalogs].sort( (a, b) =>  (a.catalog_name).localeCompare(b.catalog_name));
          }

          this.allCatalogs = res;
          this.displayedCatalogs = res;

          if (this.selectedCatalogueName) {
            res = res.filter(item => item?.catalog_name?.includes(this.selectedCatalogueName));
            this.displayedCatalogs = res;
          }
          sessionStorage.removeItem('catalogStatuses');
          sessionStorage.setItem('catalogStatuses', JSON.stringify(res));
          this.setTableDataSource(res);
        })
    );
  }

  displayRejectedCatalogue(catalogue: IBulkUploadBasic): void {
    this.router.navigate([`app/product/catalogue-details/${catalogue.catalog_name}`]);
  }

  setTableDataSource(data: IBulkUploadBasic[]): void {
    this.dataSource = new MatTableDataSource<any>(data);
    setTimeout( () => this.dataSource.paginator = this.matPaginator);
  }
}
