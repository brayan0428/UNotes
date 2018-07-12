import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UnotesServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UnotesServiceProvider {
  UrlApi = 'http://localhost:4000/UNotes/UNotes.php?';
  constructor(public http: HttpClient) {
    
  }

  ValidarUsuario(Email,Clave) {
    return this.http.get(`${this.UrlApi}Peticion=Cons_Usuarios&Email=${Email}&Clave=${Clave}`);
  }

  RegistrarUsuario(Nombre,Email,Clave){
    return this.http.get(`${this.UrlApi}Peticion=Insertar_Usuario&Nombre=${Nombre}&Email=${Email}&Clave=${Clave}`);
  }
}
