import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductComponent} from '~platform/product/components/product/product.component';
import {CatalogueComponent} from '~platform/product/components/catalogue/catalogue.component';
import {CatalogueStatusComponent} from '~platform/product/components/catalogue-status/catalogue-status.component';
import {SpecificationComponent} from '~platform/product/components/specification/specification.component';
import {CatalogueStatusByIdComponent} from '~platform/product/components/catalogue-status/catalogue-status-by-id/catalogue-status-by-id.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    children: [
      {
        path: 'catalogue',
        component: CatalogueComponent
      },
      {
        path: 'catalogue-status',
        component: CatalogueStatusComponent,
      },
      {
        path: 'catalogue-details/:id',
        component: CatalogueStatusByIdComponent
      },
      {
        path: 'specification',
        component: SpecificationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {
}
