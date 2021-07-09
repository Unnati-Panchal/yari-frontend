import * as fromAdminActions from '~app/store/admin/admin.actions';
import * as fromAdminSelectors from '~app/store/admin/admin.selectors';

import { Component, OnInit, ViewChild } from '@angular/core';
import { IEditProduct, NewImage, NewVideo } from '@yaari/models/admin/admin.interface';
import { Store, select } from '@ngrx/store';

import { ActivatedRoute } from '@angular/router';
import { AdminService } from '@yaari/services/admin/admin.service';
import { IAppState } from '~app/store/app.state';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductSpecificationComponent } from '../product-specification/product-specification.component';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

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

  @ViewChild('productDetail', { static: true }) productDetailComponent: ProductDetailComponent;
  @ViewChild('productSpecification', { static: true }) productSpecificationComponent: ProductSpecificationComponent;
  isLoading$ = this._store.pipe(select(fromAdminSelectors.getIsLoading));

  getProductDetail$ = this._store.pipe(select(fromAdminSelectors.getProductDetail$), filter(value => !!value));

  constructor(
    private route: ActivatedRoute,
    private _store: Store<IAppState>,
    private _adminService: AdminService) {
  }

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
            this.productDetailComponent.bindProduct(productDetail);
            this.productSpecificationComponent.bindProduct(productDetail);
            this.setProductId(this.selectedProductId || +productIds[0]);
          })
        );
      }
    }
  }


  selectedIndexChange(index: number): void {
    this.selectedTabIndex = index;
    if (this.selectedTabIndex === 1) {
      this._subscription.add(
        this.getProductDetail$.subscribe((productDetail) => {
          return this.productSpecificationComponent.bindProduct(productDetail);
        })
      );
    }
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

  trackByKey = (index: number): number => {
    return index;
  }

  setProductId(productId: number): void {
    this.selectedProductId = +productId;
    this._store.dispatch(fromAdminActions.getProductDetail({ productId: this.selectedProductId }));
  }

  submitProduct(): void {
    const product = {} as IEditProduct;

    product.id = +this.productDetailComponent.form.controls['id'].value;
    product.product_name = this.productDetailComponent.form.controls['product_name'].value;
    product.country_of_origin = this.productDetailComponent.form.controls['country_of_origin'].value;
    product.description = this.productDetailComponent.form.controls['product_description'].value;
    product.key_features = this.productDetailComponent.form.controls['key_feature'].value;
    product.guarantee = this.productDetailComponent.form.controls['guarantee'].value;
    product.warranty = this.productDetailComponent.form.controls['warranty'].value;
    product.mrp = this.productDetailComponent.form.controls['mrp'].value;
    product.sp = this.productDetailComponent.form.controls['final_selling_price'].value;
    product.inventory = this.productDetailComponent.form.controls['stock_count'].value;
    this.productSpecificationComponent.form.removeControl('id');
    product.specifications = this.productSpecificationComponent.form.value;
    product.to_delete_image_urls = this.productDetailComponent.deletedImages.map(i => i.src);
    const newImages = this.productDetailComponent.newImages
      .filter(r => r.newlyUploaded)
      .map(i => ({ media_bytes: i.src, media_name: i.name }));
    product.new_images = newImages as NewImage[];
    product.new_video = {
      media_bytes: this.productDetailComponent.newVideo?.data,
      media_name: this.productDetailComponent.newVideo?.name
    } as NewVideo;
    product.material_care = this.productDetailComponent.form.controls['material_care'].value;
    this._store.dispatch(fromAdminActions.editProduct({ product }));
  }
}

