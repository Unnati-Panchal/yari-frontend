import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import * as fromProfileActions from '~store/profile/profile.actions';
import {select, Store} from '@ngrx/store';
import {IAppState} from '~store/app.state';
import * as fromProfileSelectors from '~store/profile/profile.selectors';
import {filter} from 'rxjs/operators';
import {IRatingAndReviews} from '@yaari/models/product/product.interface';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

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
    'sr_no',  'sku_id', 'product_name', 'sale', 'rating', 'reviews', 'viewed', 'shared'];
  public getRatingAndReviews$ = this._store.pipe(select(fromProfileSelectors.getRatingAndReviews$), filter(value => !!value));
  loading: boolean;

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
    this.loading = true;
    this._store.dispatch(fromProfileActions.getRatingAndReviews());

    this._subscription.add(
      this.getRatingAndReviews$.subscribe( (ratingsAndReviews) => {
        this.setTableDataSource(ratingsAndReviews);
        this.loading = false;
      })
    );
  }

  setTableDataSource(data: IRatingAndReviews[]): void {
    this.dataSource = new MatTableDataSource<any>(data);
    setTimeout( () => {
      this.dataSource.paginator = this.matPaginator;
    });
  }
}
