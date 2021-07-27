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
import { CatalogueQualityScoreCardRoutingModule } from './catalogue-quality-score-card-routing.module';
import { CatalogueQualityScoreCardComponent } from './catalogue-quality-score-card.component';



@NgModule({
  declarations: [CatalogueQualityScoreCardComponent],
  imports: [
    CommonModule,
    SharedModule,
    CatalogueQualityScoreCardRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatSnackBarModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatDialogModule
  ]
})
export class CatalogueQualityScoreCardModule { }
