import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdultsInfoPage } from './adults-info.page';

const routes: Routes = [
  {
    path: '',
    component: AdultsInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdultsInfoPageRoutingModule {}
