import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {IBulkUploadBasic} from '@yaari/models/product/product.interface';
import * as fromProductsActions from '~store/products/products.actions';
import {select, Store} from '@ngrx/store';
import {IAppState} from '~store/app.state';
import * as fromProductsSelectors from '~store/products/products.selectors';
import {filter} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-catalogue-status-by-id',
  templateUrl: './catalogue-status-by-id.component.html',
  styleUrls: ['./catalogue-status-by-id.component.scss']
})
export class CatalogueStatusByIdComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['sr_no', 'catalogue_name', 'sku_id', 'errors'];
  dataSource: IBulkUploadBasic[];
  private _subscription: Subscription = new Subscription();
  public getSingleBulkUploadStatus$ = this._store.pipe(select(fromProductsSelectors.getSingleBulkUploadStatus$),
    filter(status => !!status));
  public isError$ = this._store.pipe(select(fromProductsSelectors.getIsError), filter(err => !!err));
  loading: boolean;

  constructor(private _store: Store<IAppState>, private route: ActivatedRoute) { }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loading = true;
    this._subscription.add(
      this.route.params.subscribe( params => {
        const taskId = params.taskId;
        this._store.dispatch(fromProductsActions.getBulkUploadStatusById({taskId}));
      })
    );

    this.getCataloguesRes();
  }

  getCataloguesRes(): void {
    this._subscription.add(
      this.getSingleBulkUploadStatus$.subscribe((response) => {
        this.loading = false;
        // TODO where is the endpoint for the catalogue with errors and all details
        // TODO add back button
        console.log(response);
        // this.dataSource = response;
      })
    );
  }

}
