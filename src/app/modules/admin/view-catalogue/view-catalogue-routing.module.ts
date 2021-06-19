import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ViewCatalogueComponent, ViewCatalogueDetailComponent} from '~admin/view-catalogue/components';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ViewCatalogueComponent
      },
      {
        path: 'view',
        children: [
          {
            path: '',
            component: ViewCatalogueDetailComponent
          },
        ]
      }
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ViewCatalogueRoutingModule { }
