import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '@yaari/shared.module';
import { CatalogueManagementRoutingModule } from './catalogue-management-routing.module';
import { CatalogueManagementComponent } from './components/catalogue-management/catalogue-management.component';



@NgModule({
  declarations: [CatalogueManagementComponent],
  imports: [
    CommonModule,
    SharedModule,
    CatalogueManagementRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatSnackBarModule,
  ]
})
export class CatalogueManagementModule { }
