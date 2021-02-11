import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductComponent} from './components/product/product.component';
import {CatalogueComponent} from './components/catalogue/catalogue.component';
import {ProductRoutingModule} from '~platform/product/product-routing.module';
import {CatalogueStatusComponent} from './components/catalogue-status/catalogue-status.component';
import {SpecificationComponent} from './components/specification/specification.component';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [ProductComponent, CatalogueComponent, CatalogueStatusComponent, SpecificationComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatTableModule
  ]
})
export class ProductModule {
}
