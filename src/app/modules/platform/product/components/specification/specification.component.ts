import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import * as moment from 'moment';
import * as fromProductsActions from '~store/products/products.actions';
import {select, Store} from '@ngrx/store';
import {IAppState} from '~store/app.state';
import * as fromProductsSelectors from '~store/products/products.selectors';
import {filter} from 'rxjs/operators';

export interface IProductSpecs {
  sr_no?: string;
  item?: string;
  occasion?: string;
  neck_pattern?: string;
  sleeve_pattern?: string;
  itemLength?: string;
  hemline?: string;
  next_day_dispatch?: string;
}

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
  displayedColumns: string[] = ['item', 'occasion', 'neck_pattern', 'sleeve_pattern', 'itemLength', 'hemline', 'next_day_dispatch'];
  dataSource: IProductSpecs[];

  private _subscription: Subscription = new Subscription();
  public getBulkSpecificationsUploadTemplate$ = this._store.pipe(
    select(fromProductsSelectors.getBulkSpecificationsUploadTemplate),
    filter(catalogs => !!catalogs)
  );

  constructor(private _store: Store<IAppState>) { }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
    const catalogId = '1';
    this._store.dispatch(fromProductsActions.getBulkSpecificationsUploadTemplate({catalogId}));
    this.getCataloguesRes();
  }

  getCataloguesRes(): void {
    this._subscription.add(
      this.getBulkSpecificationsUploadTemplate$.subscribe((response) => {
        this.dataSource = response.map(val => {
          return {
            item: val
          };
        });
      })
    );
  }

  submit(): void {

  }

}
