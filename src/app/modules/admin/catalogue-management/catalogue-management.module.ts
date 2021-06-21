import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@yaari/shared.module';
import { CatalogueManagementRoutingModule } from './catalogue-management-routing.module';
import { CatalogueManagementComponent } from './components/catalogue-management/catalogue-management.component';
import { ApproveRejectComponent, GalleryDialogComponent } from './components/uploaded-catalogues/approve-reject.component';
import { UploadedCataloguesComponent } from './components/uploaded-catalogues/uploaded-catalogues.component';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';



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
        MatPaginatorModule
    ]
})
export class CatalogueManagementModule { }
