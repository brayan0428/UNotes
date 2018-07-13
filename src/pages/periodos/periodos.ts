import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { UnotesServiceProvider } from '../../providers/unotes-service/unotes-service';
import { UnotesUtilidadesProvider } from '../../providers/unotes-utilidades/unotes-utilidades';

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
              public Utilidades:UnotesUtilidadesProvider) {
    this.Parametros = navParams.data;
    this.ConsultarPeriodos();
  }

  ConsultarPeriodos(){
    this.UNotesService.ConsultarPeriodos(this.Parametros.Id)
    .subscribe(
      (data) => {
        this.Periodos = data;
        console.log(data);
      },
      (error) =>{
        console.error(error);
      }
    ) 
  }
}