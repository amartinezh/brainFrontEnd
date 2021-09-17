import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SessionResultsPageRoutingModule } from './session-results-routing.module';

import { SessionResultsPage } from './session-results.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SessionResultsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SessionResultsPage]
})
export class SessionResultsPageModule {}
