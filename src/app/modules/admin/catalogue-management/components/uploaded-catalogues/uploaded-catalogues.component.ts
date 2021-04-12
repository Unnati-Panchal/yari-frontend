import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { IUploadedCatalogue } from '@yaari/models/admin/admin.interface';
import { AdminService } from '@yaari/services/admin/admin.service';
import { AuthService } from '@yaari/services/auth/auth.service';
import * as fileSaver from 'file-saver';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as fromAdminActions from '~app/store/admin/admin.actions';
import * as fromAdminSelectors from '~app/store/admin/admin.selectors';
import { AppFacade, IAppState } from '~app/store/app.state';

@Component({
  selector: 'app-uploaded-catalogues',
  templateUrl: './uploaded-catalogues.component.html',
  styleUrls: ['./uploaded-catalogues.component.scss']
})
export class UploadedCataloguesComponent implements OnInit, OnDestroy {

  constructor(
    private _store: Store<IAppState>,
    private _adminService: AdminService,
    private _appFacade: AppFacade,
    private _auth: AuthService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) { }


  displayedColumns = [
    'catalogue_name',
    'product_count',
    'supplier_business_name',
    'action',
  ];
  dataSource: MatTableDataSource<any[]>;
  allData = [];
  filter = '';
  private _subscription: Subscription = new Subscription();

  public getIsError$ = this._store.pipe(
    select(fromAdminSelectors.getIsError));

  public uploadedCatalogues$ = this._store.pipe(
    select(fromAdminSelectors.getUploadedCatalogues),
    filter(details => !!details)
  );
  ngOnInit(): void {
    this._appFacade.clearMessages();
    this.authorizedAdmin();
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public authorizedAdmin(): void {
    this._auth.adminDetails().subscribe(adminDetails => {
      // this.loading = false;
      if (adminDetails.admin_role !== 'catalogue_management') {
        this._snackBar.open('Unauthorized Access', '', { duration: 3000 });
        this._router.navigate([`/admin/${adminDetails.admin_role.split('_').join('-')}`]);
      }
      else {
        this.getUploadedCatalogues();
      }
    });
  }

  public applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getUploadedCatalogues(): void {
    this._store.dispatch(fromAdminActions.getUploadedCatalogues());
    this._subscription.add(this.uploadedCatalogues$.subscribe(res => {
      this.allData = res;
      this.dataSource = new MatTableDataSource(this.allData);
    }));
  }

  downloadCatalogueExcel(catalogue: IUploadedCatalogue): void {
    this._subscription.add(this._adminService.getCatalogueDownload(+catalogue.catalogue_id).subscribe(res => {
      const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fileSaver.saveAs(blob, `${catalogue.catalogue_name}.xlsx`);
    }));
  }
}
