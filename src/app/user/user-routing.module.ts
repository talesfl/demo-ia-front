import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorizationGuard } from '../guard/authorization.guard';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'details',
        loadChildren: () => import('./details/details.module').then(m => m.DetailsModule),
      },
      {
        path: 'management',
        loadChildren: () => import('./management/management.module').then(m => m.ManagementModule),
        canActivate: [ AuthorizationGuard ]
      },
      {
        path: 'email',
        loadChildren: () => import('./email/email.module').then(m => m.EmailModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
