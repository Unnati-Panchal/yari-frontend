import {MAT_DATE_FORMATS, MatNativeDateModule} from '@angular/material/core';
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
import {ViewCatalogueRoutingModule} from './view-catalogue-routing.module';
import {ViewCatalogueComponent, ViewCatalogueDetailComponent} from '~admin/view-catalogue/components';
import {MatButtonModule} from '@angular/material/button';
import {MatSortModule} from '@angular/material/sort';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [ViewCatalogueComponent, ViewCatalogueDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
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
    ViewCatalogueRoutingModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSortModule,
    MatListModule
  ],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MatDateFormat }]
})
export class ViewCatalogueModule { }
