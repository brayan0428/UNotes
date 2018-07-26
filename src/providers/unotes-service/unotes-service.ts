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

  IngresarMateria(IdPeriodo,Nombre,Profesor,Salon,Nota1,Nota2,Nota3,Porcentaje1,Porcentaje2,Porcentaje3){ 
    return this.http.get(`${this.UrlApi}Peticion=Insertar_Materia&IdPeriodo=${IdPeriodo}&Nombre=${Nombre}&Profesor=${Profesor}&Salon=${Salon}&Nota1=${Nota1}&Nota2=${Nota2}&Nota3=${Nota3}&Porcentaje1=${Porcentaje1}&Porcentaje2=${Porcentaje2}&Porcentaje3=${Porcentaje3}`);
  }

  
  ActualizarMateria(Id,Nombre,Profesor,Salon,Nota1,Nota2,Nota3,Porcentaje1,Porcentaje2,Porcentaje3){ 
    return this.http.get(`${this.UrlApi}Peticion=Actualizar_Materia&Id=${Id}&Nombre=${Nombre}&Profesor=${Profesor}&Salon=${Salon}&Nota1=${Nota1}&Nota2=${Nota2}&Nota3=${Nota3}&Porcentaje1=${Porcentaje1}&Porcentaje2=${Porcentaje2}&Porcentaje3=${Porcentaje3}`);
  }

  EliminarMaterias($Id){
    return this.http.get(`${this.UrlApi}Peticion=Eliminar_Materia&Id=${$Id}`);
  }

  ConsultarMaterias($IdPeriodo){
    return this.http.get(`${this.UrlApi}Peticion=Cons_Materias&IdPeriodo=${$IdPeriodo}`);
  }
}
