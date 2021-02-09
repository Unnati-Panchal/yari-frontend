import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductComponent} from './components/product/product.component';
import {CatalogueComponent} from './components/catalogue/catalogue.component';
import {ProductRoutingModule} from '~platform/product/product-routing.module';
import { CatalogueStatusComponent } from './components/catalogue-status/catalogue-status.component';
import { SpecificationComponent } from './components/specification/specification.component';


@NgModule({
  declarations: [ProductComponent, CatalogueComponent, CatalogueStatusComponent, SpecificationComponent],
  imports: [
    CommonModule,
    ProductRoutingModule
  ]
})
export class ProductModule {
}
