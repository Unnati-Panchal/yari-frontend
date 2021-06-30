import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';
import {IBulkUploadBasic, IQuery} from '@yaari/models/product/product.interface';
import {select, Store} from '@ngrx/store';
import {IAppState} from '~store/app.state';
import {filter} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {IFilter, ISupplierDetails, ISupplierOnboard} from '@yaari/models/admin/admin.interface';
import * as fileSaver from 'file-saver';

import * as fromAdminActions from '~app/store/admin/admin.actions';
import * as fromAdminSelectors from '~app/store/admin/admin.selectors';
import {downloadFile} from '@yaari/utils/utlis';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AdminService} from '@yaari/services/admin/admin.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-supplier-onboarding-approval',
  templateUrl: './supplier-onboarding-approval.component.html',
  styleUrls: ['./supplier-onboarding-approval.component.scss']
})
export class SupplierOnboardingApprovalComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'sr_no',
    'contact_person',
    'phone_no',
    'email_id',
    'type',
    'state',
    'city',
    'primary_category_name',
    'gst_no',
    'gst_certificate',
    'pan_no',
    'name_pan_card',
    'pan_card',
    'price_range_max',
    'average_monthly_stock',
    'bank_name',
    'bank_account_name',
    'bank_ifsc',
    'bank_account_number',
    'cancelled_cheque',
    'msme_certificate',
    'action',
    'comment'
  ];
  selectedDate: IQuery;
  private _subscription: Subscription = new Subscription();
  public KAMSupplierOnboardings$ = this._store.pipe(select(fromAdminSelectors.KAMSupplierOnboardings$), filter(list => !!list));
  public KAMApprovedResponse$ = this._store.pipe(select(fromAdminSelectors.KAMApprovedResponse$), filter(list => !!list));
  public isError$ = this._store.pipe(select(fromAdminSelectors.getIsError), filter(err => !!err));
  loading: boolean;
  submitted: boolean;
  public dataSource = new MatTableDataSource([]);
  selectedSupplierName: string;
  updatedComment: string[] = [];
  supplierDetails: ISupplierDetails[];

  constructor(
    private _store: Store<IAppState>,
    private _snackBar: MatSnackBar,
    private _adminService: AdminService,
    private _location: Location
  ) {
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getSupplierList();
    this.getSupplierActionResponse();
    this.viewBtn();
  }

  public backBtn(): void {
    this._location.back();
  }

  public viewBtn(): void {
    const query: IFilter = {
      filterBy: this.selectedSupplierName
    };
    this.loading = true;
    this.submitted = true;
    this._store.dispatch(fromAdminActions.getSupplierOnBoardings({filter: query}));
  }

  downloadSupplier(): void {
    this._subscription.add(
      this._adminService.downloadSupplier().subscribe(response => {
        const blob = new Blob([response], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        fileSaver.saveAs(blob, 'supplier_list.xlsx');
      })
    );
  }

  getSupplierList(): void {
    this._subscription.add(
      combineLatest([this.KAMSupplierOnboardings$])
        .subscribe(([KAMSupplierOnboardings]) => {
          this.loading = false;
          this.supplierDetails = KAMSupplierOnboardings;
          this.setTableDataSource(this.supplierDetails);
        })
    );
  }

  setTableDataSource(data: IBulkUploadBasic[]): void {
    this.dataSource = new MatTableDataSource<any>(data);
  }

  downloadImage(url: string): void {
    downloadFile(url).then();
  }

  approveSupplier(approved: ISupplierDetails, approve: boolean, index: number): void {
    const supplier: ISupplierOnboard = {
      approve,
      comment: this.updatedComment[index] ? this.updatedComment[index] : 'Na',
      supplier_id: approved.id.toString()
    };
    this._store.dispatch(fromAdminActions.approveRejectSupplier({supplier}));
  }

  getSupplierActionResponse(): void {
    this._subscription.add(
      combineLatest([this.KAMApprovedResponse$])
        .subscribe(([KAMApprovedResponse]) => {
          this.loading = false;
          this.viewBtn();
          this.openSnackBar(KAMApprovedResponse.msg);
        })
    );
  }

  openSnackBar(msg): void {
    this._snackBar.open(msg, 'X', {duration: 5000});
  }

}



