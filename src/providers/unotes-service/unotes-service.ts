import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UnotesServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UnotesServiceProvider {

  constructor(public http: HttpClient) {
    
  }

  getUsers() {
    return this.http.get('http://sistemacobros.000webhostapp.com/UNotes.php?Peticion=Cons_Usuarios&Email=brayan042864gmail.com');
  }
}
