import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {IBulkUploadBasicError} from '@yaari/models/product/product.interface';
import * as fromProductsActions from '~store/products/products.actions';
import {select, Store} from '@ngrx/store';
import {IAppState} from '~store/app.state';
import * as fromProductsSelectors from '~store/products/products.selectors';
import {filter, tap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-catalogue-status-by-id',
  templateUrl: './catalogue-status-by-id.component.html',
  styleUrls: ['./catalogue-status-by-id.component.scss']
})
export class CatalogueStatusByIdComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, {static: false}) matPaginator: MatPaginator;
  paginationSizes: number[] = [5, 15, 30, 60, 100];
  defaultPageSize = this.paginationSizes[0];

  displayedColumns: string[] = ['sr_no', 'catalogue_name', 'sku_id', 'errors'];
  public dataSource = new MatTableDataSource([]);
  private _subscription: Subscription = new Subscription();
  public getSelectedCatalogue$ = this._store.pipe(select(fromProductsSelectors.getSelectedCatalogue$),
    filter(status => !!status));
  public isError$ = this._store.pipe(
    select(fromProductsSelectors.getIsError),
    filter(err => !!err),
    tap(() => this.loading = false)
  );
  loading: boolean;

  constructor(private _store: Store<IAppState>, private route: ActivatedRoute) { }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loading = true;
    this._subscription.add(
      this.route.params.subscribe( params => this._store.dispatch(fromProductsActions.getCatalogById({id: params.id})))
    );

    this.getCataloguesRes();
  }

  setTableDataSource(data: IBulkUploadBasicError[]): void {
    this.dataSource = new MatTableDataSource<any>(data);
    setTimeout( () => {
      this.dataSource.paginator = this.matPaginator;
    });
  }

  getCataloguesRes(): void {
    this._subscription.add(
      this.getSelectedCatalogue$.subscribe((response) => {
        this.loading = false;
        const data =  response.errors?.map(error => {
          return {
            ...error,
            catalog_name: response.catalog_name
          };
        });
        this.setTableDataSource(data);
      })
    );
  }

}
