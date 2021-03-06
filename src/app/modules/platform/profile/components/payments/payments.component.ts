import * as fromProfileActions from '~store/profile/profile.actions';
import * as fromProfileSelectors from '~store/profile/profile.selectors';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import moment from 'moment';
import {FormControl, FormGroup} from '@angular/forms';
import {IPayment, IQuery} from '@yaari/models/product/product.interface';
import {Store, select} from '@ngrx/store';
import {IAppState} from '~store/app.state';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit, OnDestroy {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  displayedColumns: string[] = [
    'sr_no', 'order_id', 'sku_id', 'product_name', 'created_time', 'shipped_time', 'order_status', 'payment_status'
  ];
  loading: boolean;
  submitted: boolean;

  query: IQuery;
  selectDate: string;
  public getSupplierSettlement$ = this._store.pipe(select(fromProfileSelectors.getSupplierSettlement$), filter(value => !!value));
  public isError$ = this._store.pipe(select(fromProfileSelectors.getIsError$), filter(err => !!err));

  private _subscription: Subscription = new Subscription();

  paginationSizes: number[] = [5, 15, 30, 60, 100];
  defaultPageSize = this.paginationSizes[0];
  public dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator, {static: false}) matPaginator: MatPaginator;

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
          this.query = {startDate: start, endDate: end};
        }
      })
    );

    this._subscription.add(
      this.getSupplierSettlement$.subscribe( (payments) => {
        this.setTableDataSource(payments);
        this.loading = false;
      })
    );
  }

  public viewBtn(): void {
    this.selectDate = null;
    if (!this.query) {
      this.selectDate = 'Please Select Date Range!';
      return;
    }
    const query = {
      startDate: moment(this.query.startDate).toISOString(),
      endDate: moment(this.query.endDate).toISOString(),
    };
    this.loading = true;
    this.submitted = true;
    this._store.dispatch(fromProfileActions.getSupplierSettlement({query}));
  }

  setTableDataSource(data: IPayment[]): void {
    this.dataSource = new MatTableDataSource<any>(data);
    setTimeout( () => this.dataSource.paginator = this.matPaginator);
  }
}
