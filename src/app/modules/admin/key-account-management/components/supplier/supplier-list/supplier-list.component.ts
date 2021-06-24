import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';
import {IBulkUploadBasic, IQuery} from '@yaari/models/product/product.interface';
import {select, Store} from '@ngrx/store';
import {IAppState} from '~store/app.state';
import {filter} from 'rxjs/operators';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {IFilter, ISupplierList} from '@yaari/models/admin/admin.interface';

import * as fromAdminActions from '~app/store/admin/admin.actions';
import * as fromAdminSelectors from '~app/store/admin/admin.selectors';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss']
})
export class SupplierListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['sr_no', 'contact_person', 'email_id'];
  selectedDate: IQuery;
  private _subscription: Subscription = new Subscription();
  public KAMSupplierList$ = this._store.pipe(select(fromAdminSelectors.KAMSupplierList$), filter(list => !!list));
  public isError$ = this._store.pipe(select(fromAdminSelectors.getIsError), filter(err => !!err));
  loading: boolean;
  submitted: boolean;
  public dataSource = new MatTableDataSource([]);
  selectedSupplierName: string;

  constructor(private _store: Store<IAppState>, private router: Router) { }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getSupplierList();
  }

  public viewBtn(): void {
    const query: IFilter = {
      filterBy: this.selectedSupplierName
    };
    this.loading = true;
    this.submitted = true;
    this._store.dispatch(fromAdminActions.getSupplierList({filter: query}));
  }

  getSupplierList(): void {
    this._subscription.add(
      combineLatest([this.KAMSupplierList$])
        .subscribe(([KAMSupplierList]) => {
          this.loading = false;
          this.setTableDataSource(KAMSupplierList);
        })
    );
  }

  supplierDetails(supplier: ISupplierList): void {
    this.router.navigate([`admin/key-account-management/supplier-details/${supplier?.id}`]);
  }

  setTableDataSource(data: IBulkUploadBasic[]): void {
    this.dataSource = new MatTableDataSource<any>(data);
  }
}



