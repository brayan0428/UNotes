import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { UnotesServiceProvider } from '../../providers/unotes-service/unotes-service';
import { UnotesUtilidadesProvider } from '../../providers/unotes-utilidades/unotes-utilidades';
import { ModalController } from 'ionic-angular';
import {AgregarPeriodoPage} from '../agregar-periodo/agregar-periodo';

@Component({
  selector: 'page-periodos',
  templateUrl: 'periodos.html'
})
export class PeriodosPage {
  Parametros:any;
  Periodos:any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public UNotesService: UnotesServiceProvider,
              public Utilidades:UnotesUtilidadesProvider,
              public modal: ModalController) {
    this.Parametros = navParams.data;
    console.log(this.UNotesService.IdEst);
    this.ConsultarPeriodos();
  }

  ConsultarPeriodos(){
    this.UNotesService.ConsultarPeriodos(this.UNotesService.IdEst)
    .subscribe(
      (data) => {
        this.Periodos = data;
        //console.log(data);
      },
      (error) =>{
        console.error(error);
      }
    ) 
  }

  agregarPeriodo(){
      const modal = this.modal.create(AgregarPeriodoPage);
      modal.present();
      modal.onDidDismiss((data) => {
        this.ConsultarPeriodos();
      })
    }
}