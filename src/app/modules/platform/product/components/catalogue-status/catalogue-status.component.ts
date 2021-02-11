import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import * as moment from 'moment';

export interface PeriodicElement {
  sr_no?: string;
  catalogue_id?: string;
  type_of_product?: string;
  date_uploaded?: string;
  status?: string;
  views?: string;
  shares?: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {type_of_product: 'Kurti', status: 'Uploaded'},
  {type_of_product: 'Saree'},
  {type_of_product: 'Kurti', status: 'rejected'},
  {type_of_product: 'Shirt', status: 'pending for approval'},
  {type_of_product: 'Pant'}
];

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
