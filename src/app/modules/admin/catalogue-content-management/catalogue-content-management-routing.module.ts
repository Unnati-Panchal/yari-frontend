import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  CatalogueContentListComponent,
  CatalogueContentManagementComponent,
  CatalogueProductListComponent
} from '~admin/catalogue-content-management/components';

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
