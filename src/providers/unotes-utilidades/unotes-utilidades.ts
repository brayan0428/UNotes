import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the UnotesUtilidadesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UnotesUtilidadesProvider {

  constructor(public http: HttpClient, public alertCtrl: AlertController,) {
  }

  mostrarAlerta(titulo,mensaje){
    const alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: ['OK']
    });
    alert.present();
  }
}
