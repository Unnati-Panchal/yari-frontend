import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ICatalogueProducts, IResMsg } from '@yaari/models/admin/admin.interface';
import { AdminService } from '@yaari/services/admin/admin.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as fromAdminActions from '~app/store/admin/admin.actions';
import * as fromAdminSelectors from '~app/store/admin/admin.selectors';
import { AppFacade } from '~app/store/app.state';

@Component({
  selector: 'app-approve-reject',
  templateUrl: './approve-reject.component.html',
  styleUrls: ['./uploaded-catalogues.component.scss']
})
export class ApproveRejectComponent implements OnInit, OnDestroy {

  constructor(
    private _route: ActivatedRoute,
    private _store: Store,
    private _appFacade: AppFacade,
    private _adminService: AdminService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _dialog: MatDialog
  ) { }

  catalogueName = '';
  catalogueId = '';
  displayedColumns = [];
  specifications = [];
  dataSource: MatTableDataSource<any[]>;
  index = 0;
  theData = [];
  allData = [];
  filter = '';
  a = [];

  // columns to be displayed
  productDetails = {
    'Product SKU Id': 'sku_id',
    'Product Name': 'product_name',
    MRP: 'mrp',
    'Final Selling Price': 'sp',
    'Group Id': 'group_id',
    'Product Id': 'product_id',
    'Offers': 'offers',
    'HSN Code': 'hsn_code',
    'Stock-Count': 'inventory',
    'Re-Stock Date': 're_stock_date',
    'Product Category Name': 'category',
    'Manufacturing Date': 'manufacturing_date',
    'Country Of Origin': 'country_of_origin',
    'Image URL': 'product_img',
    'Video URL': 'video_url',
    'Key Feature': 'key_features',
    'Discount': 'discount',
    'Discount Start Date': 'discount_start_date',
    'Discount End Date': 'discount_end_date',
    Guarantee: 'guarantee',
    Warranty: 'warranty',
  };
  productSpecifications = {
    'Product SKU Id': 'sku_id',
    'Product Description': 'description',
    'Material Care': 'material_care'
  };

  private _subscription: Subscription = new Subscription();

  public getIsError$ = this._store.pipe(
    select(fromAdminSelectors.getIsError));

  public catalogueProducts$ = this._store.pipe(
    select(fromAdminSelectors.getCatalogueProducts),
    filter(details => !!details)
  );

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

  approveReject(action: string = ''): void {
    const finalComments = { approved: action, catalogue_id: this.catalogueId, product_comments: [] };
    finalComments.product_comments =
      this.a.filter(el => el.comment && el.comment.trim() !== '' && el.comment !== 'null');
    if (!finalComments.approved && finalComments.product_comments.length === 0) {
      this._snackBar.open('Please enter comments', '', { duration: 5000 });
      return;
    }
    this._adminService.approveRejectCatalogue(finalComments).subscribe(
      (res: IResMsg) => {
        if (res.success === true) {
          this._snackBar.open(`${action ? 'Approved' : 'Rejected'} Successfully`, '', { duration: 5000 });
          this._router.navigate(['../'], { relativeTo: this._route });
        }
        else {
          this._snackBar.open('Failed', '', { duration: 5000 });
        }
      });
  }

  onTabChange(index: number): void {
    this.index = index;
    if (index === 0) {
      this.displayedColumns = Object.keys(this.productDetails);
    }
    else {
      const obj1 = { ...this.productSpecifications, ...{ Comments: 'comments' } };
      this.productSpecifications = obj1;
      this.displayedColumns = Object.keys(this.productSpecifications);
    }
  }
  openMedia(urls: any): void {
    this._dialog.open(GalleryDialogComponent, {
      width: '250px',
      data: { urls }
    });
  }

  getProducts(id: number): void {
    this._store.dispatch(fromAdminActions.getCatalogueProducts({ catalogueId: id }));
    this._subscription.add(
      this.catalogueProducts$.subscribe(
        products => {
          this.allData = products;
          this.initializeDatasources();
        }));
  }

  initializeDatasources(): void {
    this.theData = [];
    this.a = [];
    this.allData.forEach((element: ICatalogueProducts) => {
      Object.keys(element.specifications).forEach(element2 => {
        if (!Object.keys(this.productSpecifications).includes(element2)) {
          this.productSpecifications[element2] = element2;
        }
      });
      const mergedObj = { ...element, ...element.specifications, ...{ category: element.product_catalog.category.name } };
      this.theData.push(mergedObj);
      this.a.push({ product_id: element.id, comment: element.comment });
    });
    this.displayedColumns = Object.keys(this.productDetails);
    this.dataSource = new MatTableDataSource(this.theData);
    this.onTabChange(0);
  }
}



@Component({
  selector: 'app-gallery-dialog',
  templateUrl: './gallery-dialog.component.html',
  styleUrls: ['./uploaded-catalogues.component.scss']
})
export class GalleryDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<GalleryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  video = false;
  ngOnInit(): void {
    if (typeof (this.data.urls) === 'string') {
      this.video = true;
    }
  }
  closeDialog(): void {
  }
}
