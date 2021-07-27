import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PricingManagementComponent } from './components/pricing-management/pricing-management.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { UpdatePricingComponent } from './components/update-pricing/update-pricing.component';

const routes: Routes = [
    {
        path: '',
        component: PricingManagementComponent,
    },
    {
        path: 'update',
        children: [
            {
                path: '',
                component: UpdatePricingComponent,
            },
            {
                path: 'products',
                component: ProductListComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PricingManagementRoutingModule { }
