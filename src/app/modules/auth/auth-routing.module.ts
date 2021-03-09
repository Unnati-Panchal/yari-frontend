import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthComponent} from '~auth/auth.component';
import {ContactUsComponent} from '~auth/contact-us/contact-us.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('~auth/login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'password-recovery',
        loadChildren: () => import('~auth/password-recovery/password-recovery.module').then(m => m.PasswordRecoveryModule)
      },
      {
        path: 'registration',
        loadChildren: () => import('~auth/registration/registration.module').then(m => m.RegistrationModule)
      },
      {
        path: 'reset-password',
        loadChildren: () => import('~auth/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
      },
      {
        path: 'contact-us',
        component: ContactUsComponent
      },
      {path: '**', redirectTo: '/auth/login'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
