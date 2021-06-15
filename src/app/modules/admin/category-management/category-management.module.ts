import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  CategoryManagementComponent,
  ViewCatalogueComponent,
  ViewProductCatalogueComponent,
  ViewProductCategoryComponent
} from '~admin/category-management/components';
import {SharedModule} from '@yaari/shared.module';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {CategoryManagementRoutingModule} from '~admin/category-management/category-management-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [CategoryManagementComponent, ViewCatalogueComponent, ViewProductCatalogueComponent, ViewProductCategoryComponent],
  imports: [
    CommonModule,
    SharedModule,
    CategoryManagementRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatSnackBarModule,
    MatInputModule,
    MatIconModule,
    MatTabsModule,
    MatDialogModule,
    MatTabsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatMomentDateModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ]
})
export class CategoryManagementModule {
}
