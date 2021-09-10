import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateAdultPageRoutingModule } from './create-adult-routing.module';

import { CreateAdultPage } from './create-adult.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateAdultPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CreateAdultPage]
})
export class CreateAdultPageModule {}
