import {MAT_DATE_FORMATS, MatNativeDateModule} from '@angular/material/core';

import {
  CatalogueContentListComponent,
  CatalogueContentManagementComponent,
  CatalogueProductListComponent,
  ProductDetailComponent,
  ProductSpecificationComponent
} from '~admin/catalogue-content-management/components';
import {CatalogueContentManagementRoutingModule} from './catalogue-content-management-routing.module';
import {CommonModule} from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDateFormat} from '@yaari/utils/MatDateFormat';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {NgModule} from '@angular/core';
import {SharedModule} from '@yaari/shared.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSortModule} from '@angular/material/sort';

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
    MatToolbarModule,
    MatButtonModule,
    MatSortModule
  ],
  providers: [{provide: MAT_DATE_FORMATS, useValue: MatDateFormat}]
})
export class CatalogueContentManagementModule {
}
