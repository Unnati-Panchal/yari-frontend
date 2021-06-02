import { RouterModule, Routes } from '@angular/router';
import {CatalogueProductListComponent} from './components/catalogue-product-list/catalogue-product-list.component'
import { CatalogueContentListComponent } from './components/catalogue-content-list/catalogue-content-list.component';
import { CatalogueContentManagementComponent } from './components/catalogue-content-management/catalogue-content-management.component';
import { CatalogueProductListComponent } from './components/catalogue-product-list/catalogue-product-list.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: CatalogueContentListComponent
    },
    {
        path: 'edit',
        component: CatalogueContentManagementComponent
    },
    {
        path:'products',
        component: CatalogueProductListComponent
    }
 ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CatalogueContentManagementRoutingModule { }
