import {Component, OnDestroy, OnInit} from '@angular/core';
import * as moment from 'moment';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import * as fromProfileActions from '~store/profile/profile.actions';
import {IPayment, IQuery} from '@yaari/models/product/product.interface';
import {select, Store} from '@ngrx/store';
import {IAppState} from '~store/app.state';
import * as fromProfileSelectors from '~store/profile/profile.selectors';
import {filter} from 'rxjs/operators';

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
    'order_id', 'order_status', 'order_total_price', 'order_total_tax', 'order_shipping_charges',
    'order_total_discount', 'order_total_reseller_margin', 'payment_status', 'created_time', 'discard_reason'
  ];
  dataSource: IPayment[];
  loading: boolean;
  submitted: boolean;

  query: IQuery;
  selectDate: string;
  public getSupplierSettlement$ = this._store.pipe(select(fromProfileSelectors.getSupplierSettlement$), filter(value => !!value));
  public isError$ = this._store.pipe(select(fromProfileSelectors.getIsError$), filter(err => !!err));

  private _subscription: Subscription = new Subscription();

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
        this.dataSource = payments;
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

}
