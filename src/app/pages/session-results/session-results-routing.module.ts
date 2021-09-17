import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SessionResultsPage } from './session-results.page';

const routes: Routes = [
  {
    path: '',
    component: SessionResultsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SessionResultsPageRoutingModule {}
