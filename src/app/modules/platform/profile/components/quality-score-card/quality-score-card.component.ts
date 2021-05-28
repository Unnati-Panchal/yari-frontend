import * as fromProfileActions from '~store/profile/profile.actions';
import * as fromProfileSelectors from '~store/profile/profile.selectors';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {IQualityScoreCard, IQuery} from '@yaari/models/product/product.interface';
import {Store, select} from '@ngrx/store';
import {IAppState} from '~store/app.state';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import moment from 'moment';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-quality-score-card',
  templateUrl: './quality-score-card.component.html',
  styleUrls: ['./quality-score-card.component.scss']
})
export class QualityScoreCardComponent implements OnInit, OnDestroy {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  displayedColumns: string[] = [
    'sr_no', 'sku_id', 'quality_rating', 'quality_score', 'shared', 'product_catalog_id'];
  selectedDate: IQuery;
  private _subscription: Subscription = new Subscription();
  public qualityScoreCard$ = this._store.pipe(select(fromProfileSelectors.qualityScoreCard$), filter(q => !!q));
  public isError$ = this._store.pipe(select(fromProfileSelectors.getIsError$), filter(q => !!q));
  loading: boolean;
  selectDate: string;

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
          this.selectedDate = {startDate: start, endDate: end};
        }
      })
    );
    this.getQualityscorecard();
  }

  public viewBtn(): void {
    const query = this.selectedDate;
    this.selectDate = null;
    if (!query || !query?.startDate || !query?.endDate) {
      this.selectDate = 'Please Select Date Range!';
      return;
    }
    this.loading = true;
    this._store.dispatch(fromProfileActions.getQualityScoreCard({query}));
  }

  getQualityscorecard(): void {
    this._subscription.add(
      this.qualityScoreCard$.subscribe((response) => {
        this.loading = false;
        this.setTableDataSource(response);
      })
    );
  }

  setTableDataSource(data: IQualityScoreCard[]): void {
    this.dataSource = new MatTableDataSource<any>(data);
    setTimeout( () => {
      this.dataSource.paginator = this.matPaginator;
    });
  }

}
