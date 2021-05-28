import { MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { ViewCatalogueComponent } from './components/view-catalogue.component';
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
import { SharedModule } from '@yaari/shared.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ViewCatalogueRoutingModule } from './view-catalogue-routing.module';

@NgModule({
  declarations: [ViewCatalogueComponent],
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
    MatProgressSpinnerModule
  ],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MatDateFormat }]
})
export class ViewCatalogueModule { }
