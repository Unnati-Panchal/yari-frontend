import { MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';

import { CatalogueContentListComponent } from './components/catalogue-content-list/catalogue-content-list.component';
import { CatalogueContentManagementComponent } from './components/catalogue-content-management/catalogue-content-management.component';
import { CatalogueContentManagementRoutingModule } from './catalogue-content-management-routing.module';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDateFormat } from '~app/shared/MatDateFormat';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgModule } from '@angular/core';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductSpecificationComponent } from './components/product-specification/product-specification.component';
import { SharedModule } from '@yaari/shared.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CatalogueProductListComponent } from './components/catalogue-product-list/catalogue-product-list.component';

@NgModule({
  declarations: [CatalogueContentManagementComponent, ProductDetailComponent, ProductSpecificationComponent, CatalogueContentListComponent, CatalogueProductListComponent],
  imports: [
    CommonModule,
    SharedModule,
    CatalogueContentManagementRoutingModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    MatMomentDateModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatToolbarModule
  ],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MatDateFormat }]
})
export class CatalogueContentManagementModule { }
