import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

@Component({
  selector: 'page-periodos',
  templateUrl: 'periodos.html'
})
export class PeriodosPage {
  Parametros:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.Parametros = navParams.data;
    console.log(this.Parametros);
  }

}