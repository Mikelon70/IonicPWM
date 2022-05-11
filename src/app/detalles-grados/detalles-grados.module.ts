import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesGradosPageRoutingModule } from './detalles-grados-routing.module';

import { DetallesGradosPage } from './detalles-grados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesGradosPageRoutingModule
  ],
  declarations: [DetallesGradosPage]
})
export class DetallesGradosPageModule {}
