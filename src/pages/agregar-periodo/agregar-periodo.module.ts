import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgregarPeriodoPage } from './agregar-periodo';

@NgModule({
  declarations: [
    AgregarPeriodoPage,
  ],
  imports: [
    IonicPageModule.forChild(AgregarPeriodoPage),
  ],
})
export class AgregarPeriodoPageModule {}
