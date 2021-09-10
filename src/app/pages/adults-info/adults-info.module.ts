import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdultsInfoPageRoutingModule } from './adults-info-routing.module';

import { AdultsInfoPage } from './adults-info.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdultsInfoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AdultsInfoPage]
})
export class AdultsInfoPageModule {}
