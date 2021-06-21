import { ApproveRejectComponent, GalleryDialogComponent } from './components/uploaded-catalogues/approve-reject.component';

import { CatalogueManagementComponent } from './components/catalogue-management/catalogue-management.component';
import { CatalogueManagementRoutingModule } from './catalogue-management-routing.module';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgModule } from '@angular/core';
import { SharedModule } from '@yaari/shared.module';
import { UploadedCataloguesComponent } from './components/uploaded-catalogues/uploaded-catalogues.component';

@NgModule({
  declarations: [CatalogueManagementComponent, UploadedCataloguesComponent, ApproveRejectComponent, GalleryDialogComponent],
  entryComponents: [GalleryDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    CatalogueManagementRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatSnackBarModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatDialogModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ]
})
export class CatalogueManagementModule { }
