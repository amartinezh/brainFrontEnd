import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModulesPageRoutingModule } from './modules-routing.module';

import { ModulesPage } from './modules.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModulesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ModulesPage]
})
export class ModulesPageModule {}
