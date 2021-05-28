import { RouterModule, Routes } from '@angular/router';
import { ViewCatalogueComponent } from './components/view-catalogue.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: ViewCatalogueComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ViewCatalogueRoutingModule { }
