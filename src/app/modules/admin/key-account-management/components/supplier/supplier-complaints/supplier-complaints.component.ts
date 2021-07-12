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
import {KAMSupplierComplaints$} from '~app/store/admin/admin.selectors';
import {getSupplierComplaints} from '~app/store/admin/admin.actions';
import {Location} from '@angular/common';

@Component({
  selector: 'app-supplier-complaints',
  templateUrl: './supplier-complaints.component.html',
  styleUrls: ['./supplier-complaints.component.scss']
})
export class SupplierComplaintsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['contact_person', 'email_id', 'phone_no', 'rating', 'grievance', 'handeling_team'];
  selectedDate: IQuery;
  private _subscription: Subscription = new Subscription();
  public KAMSupplierComplaints$ = this._store.pipe(select(fromAdminSelectors.KAMSupplierComplaints$), filter(list => !!list));
  public isError$ = this._store.pipe(select(fromAdminSelectors.getIsError), filter(err => !!err));
  loading: boolean;
  public dataSource = new MatTableDataSource([]);

  constructor(private _store: Store<IAppState>, private _location: Location) { }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getSupplierList();
    this.loading = true;
    this._store.dispatch(fromAdminActions.getSupplierComplaints());
  }

  public backBtn(): void {
    this._location.back();
  }

  getSupplierList(): void {
    this._subscription.add(
      combineLatest([this.KAMSupplierComplaints$])
        .subscribe(([KAMSupplierComplaints]) => {
          this.loading = false;
          this.setTableDataSource(KAMSupplierComplaints);
        })
    );
  }

  setTableDataSource(data: IBulkUploadBasic[]): void {
    this.dataSource = new MatTableDataSource<any>(data);
  }
}



