import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UnotesServiceProvider } from '../../providers/unotes-service/unotes-service';
import { UnotesUtilidadesProvider } from '../../providers/unotes-utilidades/unotes-utilidades';
import { PeriodosPage } from '../periodos/periodos';
import { RegistroPage } from '../registro/registro';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  email:String = 'brayan0428@gmail.com';
  clave:String = '123';
  constructor(public navCtrl: NavController,
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
    this.UNotesService.ValidarUsuario(this.email.trim(),this.clave.trim())
    .subscribe(
      (data) => {
        console.log(data);
        if(data[0]["Result"] == "True"){
          this.UNotesService.IdEst = data[0]["Id"];
          this.navCtrl.setRoot(PeriodosPage,{Id:data[0]["Id"],Nombre:data[0]["Nombre"]});
        }else{
          this.Utilidades.mostrarAlerta('Error',data[0]["Msn"]);
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
