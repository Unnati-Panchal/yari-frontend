import {Component, OnDestroy, OnInit} from '@angular/core';
import * as moment from 'moment';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';

export interface PeriodicElement {
  sr_no?: string;
  order_id?: string;
  sku_number?: string;
  type_of_product?: string;
  date_sold?: string;
  date_snipped?: string;
  order_status?: string;
  payment_mode?: string;
  payment_status?: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {order_status: 'Sold', payment_status: 'In Process', payment_mode: 'COD'},
  {order_status: 'Returned', payment_status: 'Completed', payment_mode: 'Online'},
  {order_status: 'Exchanged', payment_status: 'Not Applicable'},
  {order_status: 'Cancelled', payment_status: 'Penaity'},
];

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
    'sr_no', 'order_id', 'sku_number', 'type_of_product', 'date_sold', 'date_snipped', 'order_status', 'payment_mode', 'payment_status'
  ];
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
