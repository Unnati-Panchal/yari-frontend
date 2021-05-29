import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '@yaari/shared.module';
import { PricingManagementComponent } from './components/pricing-management/pricing-management.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { PricingManagementRoutingModule } from './pricing-management-routing-module';
import { UpdatePricingComponent } from './components/update-pricing/update-pricing.component';

@NgModule({
  declarations: [PricingManagementComponent, ProductListComponent, UpdatePricingComponent],
  imports: [
    CommonModule,
    SharedModule,
    PricingManagementRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ]
})
export class PricingManagementModule { }
