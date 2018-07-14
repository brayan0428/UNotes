import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UnotesServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UnotesServiceProvider {
  UrlApi:String = 'https://sistemacobros.000webhostapp.com/UNotes/UNotes.php?';
  
  //Variable Gobal para la Sesión
  IdEst:String = '';

  constructor(public http: HttpClient) {
    
  }

  ValidarUsuario(Email,Clave) {
    return this.http.get(`${this.UrlApi}Peticion=Cons_Usuarios&Email=${Email}&Clave=${Clave}`);
  }

  RegistrarUsuario(Nombre,Email,Clave){
    return this.http.get(`${this.UrlApi}Peticion=Insertar_Usuario&Nombre=${Nombre}&Email=${Email}&Clave=${Clave}`);
  }

  ConsultarPeriodos(IdEst){
    return this.http.get(`${this.UrlApi}Peticion=Cons_Periodos&IdEst=${IdEst}`);
  }

  IngresarProducto(IdEst,Nombre,Descripcion){ 
    return this.http.get(`${this.UrlApi}Peticion=Insertar_Periodo&IdEst=${IdEst}&Nombre=${Nombre}&Descripcion=${Descripcion}`);
  }
}
