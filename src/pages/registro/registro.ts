import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UnotesServiceProvider } from '../../providers/unotes-service/unotes-service';
import { UnotesUtilidadesProvider } from '../../providers/unotes-utilidades/unotes-utilidades';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html'
})
export class RegistroPage {
  nombre:String = '';
  email:String = '';
  clave:String = '';
  confirmarClave:string='';
  constructor(public navCtrl: NavController,
              public UNotesService:UnotesServiceProvider,
              public Utilidades:UnotesUtilidadesProvider) {

  }

  agregarUsuario(){
    if(this.nombre.trim()==''){
      this.Utilidades.mostrarAlerta('Error','Debe ingresar el nombre');
      return;
    }
    if(this.email.trim()==''){
      this.Utilidades.mostrarAlerta('Error','Debe ingresar el email');
      return;
    }
    if(this.email.indexOf('@') == -1){
      this.Utilidades.mostrarAlerta('Error','Debe ingresar un email valido');
      return;
    }
    if(this.clave.trim()==''){
      this.Utilidades.mostrarAlerta('Error','Debe ingresar la clave');
      return;
    }
    if(this.confirmarClave.trim()==''){
      this.Utilidades.mostrarAlerta('Error','Debe ingresar la confirmación de la clave');
      return;
    }
    if(this.clave.trim() != this.confirmarClave.trim()){
      this.Utilidades.mostrarAlerta('Error','Las claves no coinciden');
      return;
    }
    //Valido si ya existe un usuario con ese correo
    let ExisteUsu:boolean = false;
    this.UNotesService.ValidarUsuario(this.email.trim(),'')
    .subscribe(
      (data) => {
        if(data[0]["Result"] == "True"){
          ExisteUsu = true;
        }
      },
      (error) =>{console.error(error);}
    ) 
    if(ExisteUsu = true){
      this.Utilidades.mostrarAlerta('Error','Ya existe un usuario registrado con ese correo');
      return;
    }
    //Ingreso el usuario
    this.UNotesService.RegistrarUsuario(this.nombre.trim(),this.email.trim(),this.clave.trim())
    .subscribe(
      (data) => {
        console.log(data);
        if(data[0]["Result"] == "True"){
          this.Utilidades.mostrarAlerta('Confirmación','Usuario Creado Exitosamente');
          this.navCtrl.setRoot(LoginPage);
        }else{
          this.Utilidades.mostrarAlerta('Error',data[0]["Msn"]);
        }
      },
      (error) =>{console.error(error);}
    ) 
  }

  retornarLogin(){
    this.navCtrl.pop();
  }
}