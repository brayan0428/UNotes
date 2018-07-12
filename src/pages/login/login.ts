import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { UnotesServiceProvider } from '../../providers/unotes-service/unotes-service';
import { UnotesUtilidadesProvider } from '../../providers/unotes-utilidades/unotes-utilidades';
import { PeriodosPage } from '../periodos/periodos';
import { RegistroPage } from '../registro/registro';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  email:String = '';
  clave:String = '';

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public UNotesService: UnotesServiceProvider,
              public Utilidades:UnotesUtilidadesProvider) {

  }

  validarLogin(){
    if(this.email.trim() == ''){
        this.Utilidades.mostrarAlerta('Error','Debe ingresar el email');
        return;
    }
    if(this.clave.trim() == ''){
      this.Utilidades.mostrarAlerta('Error','Debe ingresar la clave');
      return;
    }
    this.UNotesService.getUsers()
    .subscribe(
      (data) => {
        if(data["Resultado"] == true){
          alert('Ok');
          this.navCtrl.setRoot(RegistroPage);
        } 
      },
      (error) =>{
        console.error(error);
      }
    ) 
  }

  Registrarme(){
    this.navCtrl.push(RegistroPage);
  }
}
