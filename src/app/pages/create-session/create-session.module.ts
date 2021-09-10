import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateSessionPageRoutingModule } from './create-session-routing.module';

import { CreateSessionPage } from './create-session.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateSessionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CreateSessionPage]
})
export class CreateSessionPageModule {}
