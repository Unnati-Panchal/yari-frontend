import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import * as moment from 'moment';
import {IQualityScoreCard, IQuery} from '@yaari/models/product/product.interface';
import {select, Store} from '@ngrx/store';
import * as fromProfileSelectors from '~store/profile/profile.selectors';
import {filter} from 'rxjs/operators';
import {IAppState} from '~store/app.state';
import * as fromProfileActions from '~store/profile/profile.actions';

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
    'id', 'sku_id', 'quality_rating', 'quality_score', 'shared', 'product_catalog_id'];
  selectedDate: IQuery;
  dataSource: IQualityScoreCard[];
  private _subscription: Subscription = new Subscription();
  public qualityScoreCard$ = this._store.pipe(select(fromProfileSelectors.qualityScoreCard$), filter(q => !!q));
  loading: boolean;
  submitted: boolean;

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
    if (!query || !query?.startDate || !query?.endDate) {
      this.range.get('end').setErrors({InvalidRange: true});
      this.range.updateValueAndValidity();
      return;
    }
    this.loading = true;
    this.submitted = true;
    this._store.dispatch(fromProfileActions.getQualityScoreCard({query}));
  }

  getQualityscorecard(): void {
    this._subscription.add(
      this.qualityScoreCard$.subscribe((response) => {
        this.loading = false;
        this.dataSource = response;
      })
    );
  }

}
