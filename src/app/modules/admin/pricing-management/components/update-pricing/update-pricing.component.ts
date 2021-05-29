import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { IPricingCatalogue } from '@yaari/models/admin/admin.interface';
import { AdminService } from '@yaari/services/admin/admin.service';
import { Subscription } from 'rxjs';
import { AppFacade } from '~app/store/app.state';

@Component({
  selector: 'app-update-pricing',
  templateUrl: './update-pricing.component.html',
  styleUrls: ['./update-pricing.component.scss']
})
export class UpdatePricingComponent implements OnInit, OnDestroy {
  displayedColumns = [
    'catalogue_name',
    'product_count',
    'category',
    'supplier_business_name',
    'uploaded_by',
    'uploaded_date',
    'approved_by',
    'approved_date',
  ];

  public dataSource: MatTableDataSource<IPricingCatalogue>;
  public allData = [];
  public filter = '';
  private _subscription: Subscription = new Subscription();
  public loading: boolean;
  public currentPage = 0;
  public pageSize = 20;
  constructor(
    private _adminService: AdminService,
    private _appFacade: AppFacade,
    private _snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.loading = true;
    this._adminService.authorizedAdmin('pricing_management');
    this._appFacade.clearMessages();
    this.getPricingCatalogues();
  }

  public search(filterValue: string): void {
    this.loading = true;
    const skip = 0;
    filterValue = filterValue.trim();
    this.fetchPricingCatalogues(skip, this.pageSize, filterValue);
  }

  public getPricingCatalogues = (next: boolean = true) => {
    this.loading = true;
    let skip = 0;
    if (next) {
      this.currentPage += 1;
      skip = (this.currentPage - 1) * this.pageSize;
    }
    else {
      this.currentPage -= 1;
      skip = (this.currentPage - 1) * this.pageSize;
    }
    this.fetchPricingCatalogues(skip, this.pageSize);
  }

  fetchPricingCatalogues = (skip: number, pageSize: number, filterBy: string = '') => {
    this._subscription.add(this._adminService.getPricingCatalogues(skip, pageSize, filterBy).subscribe(
      (pricingCatalogues: IPricingCatalogue[]) => {
        this.dataSource = new MatTableDataSource(pricingCatalogues);
        this.loading = false;
      }));
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
