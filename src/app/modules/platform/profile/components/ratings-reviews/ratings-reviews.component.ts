import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import * as fromProfileActions from '~store/profile/profile.actions';
import {select, Store} from '@ngrx/store';
import {IAppState} from '~store/app.state';
import * as fromProfileSelectors from '~store/profile/profile.selectors';
import {filter} from 'rxjs/operators';
import {IRatingAndReviews} from '@yaari/models/product/product.interface';

@Component({
  selector: 'app-ratings-reviews',
  templateUrl: './ratings-reviews.component.html',
  styleUrls: ['./ratings-reviews.component.scss']
})
export class RatingsReviewsComponent implements OnInit, OnDestroy {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  displayedColumns: string[] = [
    'id', 'sku_id', 'product_name', 'country_of_origin', 'reviews', 'warranty', 'rating'];
  dataSource: IRatingAndReviews[];
  public getRatingAndReviews$ = this._store.pipe(select(fromProfileSelectors.getRatingAndReviews$), filter(value => !!value));
  loading: boolean;

  private _subscription: Subscription = new Subscription();

  constructor(private _store: Store<IAppState>) { }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
    // this._subscription.add(
    //   this.range.valueChanges.subscribe( range => {
    //     const start = moment(range.start)?.format('YYYY-MM-DD');
    //     const end = moment(range.end)?.format('YYYY-MM-DD');
    //     if (start && end && start !== 'Invalid date' && end !== 'Invalid date') {
    //       console.log({startDate: start, endDate: end});
    //     }
    //   })
    // );
    this._store.dispatch(fromProfileActions.getRatingAndReviews());
    this.loading = true;

    this._subscription.add(
      this.getRatingAndReviews$.subscribe( (ratingsAndReviews) => {
        this.dataSource = ratingsAndReviews;
        this.loading = false;
      })
    );

  }

  // public viewBtn(): void {
  //
  // }
}
