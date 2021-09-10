import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateAdultPage } from './create-adult.page';

const routes: Routes = [
  {
    path: '',
    component: CreateAdultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateAdultPageRoutingModule {}
