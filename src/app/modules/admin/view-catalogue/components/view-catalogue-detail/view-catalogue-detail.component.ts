import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppFacade} from '~store/app.state';
import {AdminService} from '@yaari/services/admin/admin.service';
import {ICatalogueProducts} from '@yaari/models/admin/admin.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import * as fromAdminSelectors from '~store/admin/admin.selectors';
import * as fromAdminActions from '~store/admin/admin.actions';
import {GalleryDialogComponent} from '~admin/catalogue-management/components/uploaded-catalogues/approve-reject.component';
import {filter} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-view-catalogue-detail',
  templateUrl: './view-catalogue-detail.component.html',
  styleUrls: ['./view-catalogue-detail.component.scss']
})

export class ViewCatalogueDetailComponent implements OnInit {
  catalogueName = '';
  catalogueId = '';
  displayedColumns = [];
  specifications = [];
  dataSource: MatTableDataSource<any[]>;
  index = 0;
  theData = [];
  allData = [];
  filter = '';
  productSpecificationData = [];
  paginationSizes: number[] = [5, 15, 30, 60, 100];
  defaultPageSize = this.paginationSizes[0];
  @ViewChild(MatPaginator, {static: false}) matPaginator: MatPaginator;
  // columns to be displayed
  public loading: boolean;

  productDetails = {
    'Product SKU Id': 'sku_id',
    'Product Name': 'product_name',
    MRP: 'mrp',
    'Final Selling Price': 'sp',
    'Stock-Count': 'inventory',
    'Re-Stock Date': 're_stock_date',
    'Product Category Name': 'category',
    'Manufacturing Date': 'manufacturing_date',
    'Country Of Origin': 'country_of_origin',
    'Image URL': 'product_img',
    'Video URL': 'video_url',
    'Key Feature': 'key_features',
    Offer: 'discount',
    'Offer Start Date': 'discount_start_date',
    'Offer End Date': 'discount_end_date',
    Guarantee: 'guarantee',
    Warranty: 'warranty',
  };

  productSpecifications = {
    'Product SKU Id': 'sku_id',
    'Product Description': 'description',
    'Material Care': 'material_care'
  };

  public getIsError$ = this._store.pipe(
    select(fromAdminSelectors.getIsError));
  public catalogueProducts$ = this._store.pipe(
    select(fromAdminSelectors.getCatalogueProducts),
    filter(details => !!details)
  );
  private _subscription: Subscription = new Subscription();

  constructor(
    private _route: ActivatedRoute,
    private _store: Store,
    private _appFacade: AppFacade,
    private _adminService: AdminService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this._appFacade.clearMessages();
    this._adminService.authorizedAdmin('catalogue_management');
    this._route.params.subscribe(data => {
      this.catalogueId = data.id;
      this.catalogueName = data.name;
      this.getProducts(+this.catalogueId);
    });
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  onTabChange(index: number): void {
    this.index = index;
    if (index === 0) {
      this.displayedColumns = Object.keys(this.productDetails);
    } else {
      const obj1 = {...this.productSpecifications, ...{Comments: 'comments'}};
      this.productSpecifications = obj1;
      this.displayedColumns = Object.keys(this.productSpecifications);
    }
  }

  openMedia(urls: any): void {
    this._dialog.open(GalleryDialogComponent, {
      width: '%50',
      data: {urls}
    });
  }

  getProducts(id: number): void {
    this._store.dispatch(fromAdminActions.getCatalogueProducts({catalogueId: id}));
    this._subscription.add(
      this.catalogueProducts$.subscribe(
        products => {
          this.allData = products;
          this.initializeDatasources();
        }));
  }

  initializeDatasources(): void {
    this.theData = [];
    this.productSpecificationData = [];
    this.allData.forEach((element: ICatalogueProducts) => {
      Object.keys(element.specifications).forEach(element2 => {
        if (!Object.keys(this.productSpecifications).includes(element2)) {
          this.productSpecifications[element2] = element2;
        }
      });
      const mergedObj = {...element, ...element.specifications, ...{category: element.product_catalog.category.name}};
      this.theData.push(mergedObj);
      this.productSpecificationData.push({product_id: element.id, comment: element.comment});
    });
    this.displayedColumns = Object.keys(this.productDetails);
    this.dataSource = new MatTableDataSource(this.theData);
    setTimeout(() => {
      this.dataSource.paginator = this.matPaginator;
    });
    this.onTabChange(0);
  }
}
