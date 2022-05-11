import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesGradosPage } from './detalles-grados.page';

const routes: Routes = [
  {
    path: '',
    component: DetallesGradosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesGradosPageRoutingModule {}
