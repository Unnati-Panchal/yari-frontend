import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import * as moment from 'moment';

export interface PeriodicElement {
  sr_no?: string;
  order_id?: string;
  sku_number?: string;
  date_shipped?: string;
  exchange_or_return_date?: string;
  product_type?: string;
  penalty?: string;
  penalty_amount?: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {sr_no: '1'},
  {sr_no: '2'},
  {sr_no: '3'},
  {sr_no: '4'},
  {sr_no: '5'}
];

@Component({
  selector: 'app-exchange-return',
  templateUrl: './exchange-return.component.html',
  styleUrls: ['./exchange-return.component.scss']
})
export class ExchangeReturnComponent implements OnInit, OnDestroy {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  displayedColumns: string[] = [
    'sr_no', 'order_id', 'sku_number', 'date_shipped', 'exchange_or_return_date', 'product_type', 'penalty', 'penalty_amount'];
  dataSource = ELEMENT_DATA;

  private _subscription: Subscription = new Subscription();

  constructor() { }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
    this._subscription.add(
      this.range.valueChanges.subscribe( range => {
        const start = moment(range.start)?.format('YYYY-MM-DD');
        const end = moment(range.end)?.format('YYYY-MM-DD');
        if (start && end && start !== 'Invalid date' && end !== 'Invalid date') {
          console.log({startDate: start, endDate: end});
        }
      })
    );
  }

  public viewBtn(): void {

  }
}
