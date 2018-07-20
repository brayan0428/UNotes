import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-materias',
  templateUrl: 'materias.html',
})
export class MateriasPage {
  Parametros:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.Parametros = navParams.data
    console.log(this.Parametros);
  }
}

