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
import {getResellerComplaints, getSupplierComplaints} from '~app/store/admin/admin.actions';
import {Location} from '@angular/common';

@Component({
  selector: 'app-reseller-complaints',
  templateUrl: './reseller-complaints.component.html',
  styleUrls: ['./reseller-complaints.component.scss']
})
export class ResellerComplaintsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['business_name', 'email_id', 'phone_no', 'grievance', 'handeling_team'];
  selectedDate: IQuery;
  private _subscription: Subscription = new Subscription();
  public KAMResellerComplaints$ = this._store.pipe(select(fromAdminSelectors.KAMResellerComplaints$), filter(list => !!list));
  public isError$ = this._store.pipe(select(fromAdminSelectors.getIsError), filter(err => !!err));
  loading: boolean;
  public dataSource = new MatTableDataSource([]);

  constructor(private _store: Store<IAppState>, private _location: Location) { }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getKAMResellerComplaints();
    this.loading = true;
    this._store.dispatch(fromAdminActions.getResellerComplaints());
  }

  public backBtn(): void {
    this._location.back();
  }

  getKAMResellerComplaints(): void {
    this._subscription.add(
      combineLatest([this.KAMResellerComplaints$])
        .subscribe(([KAMResellerComplaints]) => {
          this.loading = false;
          this.setTableDataSource(KAMResellerComplaints);
        })
    );
  }

  setTableDataSource(data: IBulkUploadBasic[]): void {
    this.dataSource = new MatTableDataSource<any>(data);
  }
}



