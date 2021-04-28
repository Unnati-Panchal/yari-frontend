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
import {MatSelectModule} from '@angular/material/select';
import {SharedModule} from '@yaari/shared.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {CatalogueStatusByIdComponent} from './components/catalogue-status/catalogue-status-by-id/catalogue-status-by-id.component';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [ProductComponent, CatalogueComponent, CatalogueStatusComponent, SpecificationComponent, CatalogueStatusByIdComponent],
    imports: [
        CommonModule,
        ProductRoutingModule,
        MatButtonModule,
        MatFormFieldModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MatTableModule,
        MatSelectModule,
        SharedModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatCheckboxModule,
        MatIconModule,
        MatPaginatorModule
    ]
})
export class ProductModule {
}
