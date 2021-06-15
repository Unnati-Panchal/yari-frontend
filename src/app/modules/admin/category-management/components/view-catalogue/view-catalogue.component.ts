import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Subscription} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {Store} from '@ngrx/store';
import {AppFacade, IAppState} from '~store/app.state';
import {AdminService} from '@yaari/services/admin/admin.service';
import {ICategoryDetail} from '@yaari/models/admin/admin.interface';

@Component({
  selector: 'app-view-catalogue',
  templateUrl: './view-catalogue.component.html',
  styleUrls: ['./view-catalogue.component.scss']
})
export class ViewCatalogueComponent implements OnInit, OnDestroy {


  public loading: boolean;
  public dataSource = new MatTableDataSource([]);
  filter = '';
  paginationSizes: number[] = [5, 15, 30, 60, 100];
  defaultPageSize = this.paginationSizes[0];
  @ViewChild(MatPaginator, {static: false}) matPaginator: MatPaginator;
  displayedColumns = [
    'id',
    'catalogue_uploaded_date',
    'catalogue_uploaded_by',
    'catalogue_status',
  ];
  private _subscription: Subscription = new Subscription();

  constructor(
    private _store: Store<IAppState>,
    private _adminService: AdminService,
    private _appFacade: AppFacade
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    this._appFacade.clearMessages();
    this._adminService.authorizedAdmin('category_management');

    // this._store.dispatch(fromAdminActions.getUploadedCatalogues());
    this._subscription.add(
      this._adminService.getCategoryCatalogues(100, 0).subscribe(viewCatalogues => {
        this.setTableDataSource(viewCatalogues);
        this.loading = false;
      })
    );
  }

  setTableDataSource(data: ICategoryDetail[]): void {
    this.dataSource = new MatTableDataSource<any>(data);
    setTimeout(() => {
      this.dataSource.paginator = this.matPaginator;
    });
  }


  public applyFilter(filterValue: string): void {
    this.loading = true;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    this.loading = false;
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }


}
