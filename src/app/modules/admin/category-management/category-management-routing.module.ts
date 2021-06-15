import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProductCatalogueResolver, ProductCategoryResolver} from '~admin/category-management/resolvers';
import {
  CategoryManagementComponent,
  ViewCatalogueComponent,
  ViewProductCatalogueComponent,
  ViewProductCategoryComponent
} from '~admin/category-management/components';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CategoryManagementComponent
      },
      {
        path: 'view-catalogue',
        children: [
          {
            path: '',
            component: ViewCatalogueComponent
          },
          {
            path: 'product-category',
            children: [
              {
                path: '',
                component: ViewProductCategoryComponent,
                resolve: [ProductCategoryResolver]
              },
              {
                path: 'product',
                component: ViewProductCatalogueComponent,
                resolve: [ProductCatalogueResolver]
              }
            ]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ProductCategoryResolver, ProductCatalogueResolver]
})
export class CategoryManagementRoutingModule {
}
