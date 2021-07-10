import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailResolver } from 'src/app/resolver/email.resolver';
import { EmailComponent } from './email.component';

const routes: Routes = [
  {
    path: '',
    component: EmailComponent,
    resolve: { page: EmailResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailRoutingModule { }
