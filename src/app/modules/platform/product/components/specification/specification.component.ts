import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import * as moment from 'moment';

export interface PeriodicElement {
  sr_no?: string;
  item?: string;
  occasion?: string;
  neck_pattern?: string;
  sleeve_pattern?: string;
  itemLength?: string;
  hemline?: string;
  next_day_dispatch?: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {sr_no: '1'},
  {sr_no: '2'},
  {sr_no: '3'},
  {sr_no: '4'},
  {sr_no: '5'}
];


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
  displayedColumns: string[] = [
    'sr_no', 'item', 'occasion', 'neck_pattern', 'sleeve_pattern', 'itemLength', 'hemline', 'next_day_dispatch'];
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

  public submit(): void {

  }

}
