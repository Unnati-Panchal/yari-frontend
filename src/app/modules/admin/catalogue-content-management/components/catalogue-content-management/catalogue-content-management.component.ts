import * as fromAdminActions from '~app/store/admin/admin.actions';
import * as fromAdminSelectors from '~app/store/admin/admin.selectors';

import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { ActivatedRoute } from '@angular/router';
import { AdminService } from '@yaari/services/admin/admin.service';
import { IAppState } from '~app/store/app.state';
import { IEditProduct } from '@yaari/models/admin/admin.interface';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { Subscription } from 'rxjs/internal/Subscription';
import { filter } from 'rxjs/operators';
import * as _ from 'lodash';


@Component({
  selector: 'app-catalogue-content-management',
  templateUrl: './catalogue-content-management.component.html',
  styleUrls: ['./catalogue-content-management.component.scss']
})
export class CatalogueContentManagementComponent implements OnInit {

  selectedTabIndex = 0;
  productIds = [];
  selectedProductId: number;

  private _subscription: Subscription = new Subscription();

  @ViewChild('productDetail',{static : true}) productDetailComponent: ProductDetailComponent;

  constructor(
    private route: ActivatedRoute,
    private _store: Store<IAppState>,
    private _adminService: AdminService) { }

  //getProductDetails$ = this._store.pipe(select(fromAdminSelectors.getProductDetails$), filter(value => !!value));
  getProductDetail$ = this._store.pipe(select(fromAdminSelectors.getProductDetail$), filter(value => !!value));


  ngOnInit(): void {
    this._adminService.authorizedAdmin('catalogue_management');
    if (this.route.snapshot.queryParamMap.has('productIds')) {
      {
        const productIds = this.route.snapshot.queryParamMap.get('productIds').split(',');
        this.pushProductIds(productIds);
        this.setProductId(+productIds[0]);
        this._store.dispatch(fromAdminActions.getProductDetails({ productIds: this.productIds.toString() }));
        this._subscription.add(
          this.getProductDetail$.subscribe((productDetail) => {
            return this.productDetailComponent.bindProduct(productDetail);
          })
        );
      }
    }
  }


  selectedIndexChange(index: number): void {
    this.selectedTabIndex = index;
  }

  pushProductIds(productIds: string[]): void {
    productIds.forEach(productId => {
      this.productIds.push(productId);
    });
  }

  arrangeProductIdQuery(productId: string): string[] {
    if (!this.productIds) {
      return null;
    }

    const currentProductId = this.productIds.find(p => p === productId);
    if (!currentProductId) {
      return this.productIds;
    }

    const newProductIds = [...this.productIds.filter(p => p !== currentProductId)];

    newProductIds.unshift(currentProductId);

    return newProductIds;
  }

  setProductId(productId: number): void {

    this.selectedProductId = +productId;
    this._store.dispatch(fromAdminActions.getProductDetail({productId : this.selectedProductId}));

  }

  submitProduct(): void {
    const product = {} as IEditProduct;
    product.id = +this.productDetailComponent.form.controls['id'].value;
    product.description = this.productDetailComponent.form.controls['product_description'].value;
    product.mrp = this.productDetailComponent.form.controls['mrp'].value;
    product.sp = this.productDetailComponent.form.controls['final_selling_price'].value;
    this._store.dispatch(fromAdminActions.editProduct({ product }));
  }
}
