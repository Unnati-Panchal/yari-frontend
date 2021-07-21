import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { IPricingEdit, IPricingProduct, IResMsg } from '@yaari/models/admin/admin.interface';
import { AdminService } from '@yaari/services/admin/admin.service';
import * as fileSaver from 'file-saver';
import { Subscription } from 'rxjs';
import { AppFacade } from '~app/store/app.state';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  constructor(
    private _adminService: AdminService,
    private _appFacade: AppFacade,
    private _route: ActivatedRoute,
    private _snackbar: MatSnackBar) { }


  displayedColumns = [
    'select',
    'sku_id',
    'product_name',
    'group_id',
    'product_id',
    'sp',
    'mrp',
    'offers',
    'comment'
  ];

  dataSource: MatTableDataSource<IPricingProduct>;
  filter = '';

  // offerTypes = {
  //   0: 'ZERO',
  //   'Flat 10%': 'FLAT_10',
  //   'Upto 50%': 'UP_TO_50',
  //   '51%-80%': 'BETWEEN_51_80',
  //   '81% & above': 'ABOVE_80',
  //   'Combo offers': 'COMBO'
  // };
  offerTypes: any;
  offers = [];

  private _subscription: Subscription = new Subscription();
  public loading: boolean;
  res = [];
  cpy = [];
  checked = [];
  catalogueId: number;
  catalogueName: string;

  ngOnInit(): void {
    this.loading = true;
    this._appFacade.clearMessages();
    this._adminService.authorizedAdmin('pricing_management');
    this.res = [];
    this.cpy = [];
    this.checked = [];
    this.getOffers();
    this._route.params.subscribe(params => {
      this.catalogueId = params.id;
      this.catalogueName = params.name;
    });
    this.getPricingProducts();
  }

  public applyFilter(filterValue: string): void {
    this.loading = true;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    this.loading = false;
  }
  public getPricingProducts = () => {

    this.loading = true;
    this.cpy = [];
    this.res = [];
    this._subscription.add(this._adminService.getPricingProducts(this.catalogueId).subscribe((pricingProducts: IPricingProduct[]) => {
      this.cpy = JSON.parse(JSON.stringify(pricingProducts));
      this.res = pricingProducts;
      this.dataSource = new MatTableDataSource(pricingProducts);
      this.loading = false;
    }));
  }

  public change = (check, index) => {
    if (check) {
      this.checked.push(index);
    }
    else {
      this.checked = this.checked.filter(idx => idx !== index);
      const z = this.res[index];
      this.cpy[index] = { ...z };
      this.offers = Object.keys(this.offerTypes);
    }
  }

  public changeOffer = (value: string, index: number) => this.cpy[index].offers = value;

  public download = (catalogueId = this.catalogueId, catalogueName = this.catalogueName) => {
    this._subscription.add(this._adminService.getPricingCatalogueDownload(catalogueId).subscribe(res => {
      const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fileSaver.saveAs(blob, `${catalogueName}.xlsx`);
    }));
  }

  public edit = () => {
    if (!this.checked.length){
      this._snackbar.open('Please select a product to edit', 'Dismiss', { duration: 5000 });
      return;
    }
    this.loading = true;
    const editDetailsList = [];
    this.checked.forEach(productIndex => {
      const productEditDetails: IPricingEdit = {
        id: this.cpy[productIndex].id,
        sku_id: this.cpy[productIndex].sku_id,
        product_id: this.cpy[productIndex].product_id,
        mrp: this.cpy[productIndex].mrp,
        sp: this.cpy[productIndex].sp,
        offers: this.cpy[productIndex].offers,
        comment: this.cpy[productIndex].comment,
      };
      editDetailsList.push(productEditDetails);
    });
    this.editPricing(editDetailsList);
  }

  public editPricing = (editPricingDetails: IPricingEdit[]) => {
    this._subscription.add(this._adminService.editPricing(editPricingDetails).subscribe((res: IResMsg) => {
      this._snackbar.open(res.msg, 'Dismiss', { duration: 5000 });
      if (res.success) {
        this.ngOnInit();
      }
    }));
  }

  public upload = (fileInputEvent: any) => {
    this.loading = true;
    const file = new FormData();
    file.append('file', fileInputEvent.target.files[0]);
    this._subscription.add(this._adminService.uploadPricing(file).subscribe((res: IResMsg) => {
      this._snackbar.open(res.msg, 'Dismiss', { duration: 5000 });
      this.loading = false;
      if (res.success) {
        this.ngOnInit();
      }
    }));
  }

  getOffers = () => this._subscription.add(this._adminService.getofferTypes().subscribe(res => {
    this.offerTypes = res;
    this.offers = Object.keys(this.offerTypes);
  }))

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  restrictAlphabets = ($event) => {
    const x = $event.which || $event.keycode;
    return (x >= 48 && x <= 57);
  }

  restrictSellingPrice(sellingPrice: string, mrp: number, index: number): void {
    if (Number(sellingPrice) > mrp) {
      this.cpy[index].sp = this.cpy[index].mrp;
      this._snackbar.open('Selling Price should not be greater than MRP', 'Dismiss', { duration: 5000 });
    }
    if (Number(sellingPrice) < 1) {
      this.cpy[index].sp = 1;
      this._snackbar.open('Selling Price should be greater than 0', 'Dismiss', { duration: 5000 });
    }
    if (mrp < 1) {
      this.cpy[index].sp = 1;
      this._snackbar.open('MRP should be greater than 0', 'Dismiss', { duration: 5000 });
    }
  }
}

