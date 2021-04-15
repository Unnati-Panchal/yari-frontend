import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { SuperUserComponent } from './components/super-user/super-user.component';

const routes: Routes = [
  {
    path: '',
    component: SuperUserComponent
  },
  {
    path: 'create-user',
    component: CreateUserComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperUserRoutingModule { }
