import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import { UnotesServiceProvider } from '../../providers/unotes-service/unotes-service';
import { UnotesUtilidadesProvider } from '../../providers/unotes-utilidades/unotes-utilidades';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-agregar-materia',
  templateUrl: 'agregar-materia.html',
})
export class AgregarMateriaPage {
  public nombre:string = '';
  public profesor:string ='';
  public salon:string='';
  public nota1:number = 0;
  public nota2:number = 0;
  public nota3:number = 0;
  public porcentaje1:string = '0';
  public porcentaje2:string = '0';
  public porcentaje3:string = '0';
  public IdPeriodo:number;
  public Acc:boolean = true;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public UNotesService: UnotesServiceProvider,
              public Utilidades:UnotesUtilidadesProvider,public alertCtrl: AlertController) 
  {
              this.IdPeriodo = this.navParams.data.data.Id;
              //console.log(this.navParams.data.data);
              if(!this.navParams.data.data.Acc){
                this.Acc = false;
                var dato = this.navParams.data.data;
                this.IdPeriodo = dato.id;
                this.nombre = dato.nombre;
                this.profesor = dato.profesor;
                this.salon = dato.salon;
                this.nota1 = dato.nota1;
                this.nota2 = dato.nota2;
                this.nota3 = dato.nota3;
                this.porcentaje1 = dato.porcentaje1;
                this.porcentaje2 = dato.porcentaje2;
                this.porcentaje3 = dato.porcentaje3;
              }
  }

  guardarMateria(){
    if(this.nombre.trim() == ''){
      this.Utilidades.mostrarAlerta('Error de Validación','Debe ingresar el nombre de la materia');
      return;
    }
    let suma = parseInt(this.porcentaje1) + parseInt(this.porcentaje2) + parseInt(this.porcentaje3);
    //console.log(suma);
    if(suma > 100){
      this.Utilidades.mostrarAlerta('Error de Validación','La suma de los porcentajes no puede ser mayor a 100');
      return;
    }
    this.UNotesService.IngresarMateria(this.IdPeriodo,this.nombre,this.profesor,this.salon,this.nota1,this.nota2,this.nota3,
    this.porcentaje1,this.porcentaje2,this.porcentaje3).subscribe(
      (data) => {
        if(data[0]["Result"] == "True"){
          this.Utilidades.mostrarAlerta('Confirmación',data[0]["Msn"]);
          this.navCtrl.pop();
        }else{
          this.Utilidades.mostrarAlerta('Error',data[0]["Msn"]);
        }
      },(error) => {
        console.log(error);
      }
    )
  }

  actualizarMateria(){
    if(this.nombre.trim() == ''){
      this.Utilidades.mostrarAlerta('Error de Validación','Debe ingresar el nombre de la materia');
      return;
    }
    let suma = parseInt(this.porcentaje1) + parseInt(this.porcentaje2) + parseInt(this.porcentaje3);
    //console.log(suma);
    if(suma > 100){
      this.Utilidades.mostrarAlerta('Error de Validación','La suma de los porcentajes no puede ser mayor a 100');
      return;
    }
    this.UNotesService.ActualizarMateria(this.IdPeriodo,this.nombre,this.profesor,this.salon,this.nota1,this.nota2,this.nota3,
    this.porcentaje1,this.porcentaje2,this.porcentaje3).subscribe(
      (data) => {
        if(data[0]["Result"] == "True"){
          this.Utilidades.mostrarAlerta('Confirmación',data[0]["Msn"]);
          this.navCtrl.pop();
        }else{
          this.Utilidades.mostrarAlerta('Error',data[0]["Msn"]);
        }
      },(error) => {
        console.log(error);
      }
    )
  }

  eliminarMateria(){
    let alert = this.alertCtrl.create({
      title: 'Confirmar Eliminación',
      message: 'Esta seguro que desea eliminar la materia?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            this.UNotesService.EliminarMaterias(this.IdPeriodo).subscribe(
                (data) => {
                  if(data[0]["Result"] == "True"){
                    this.Utilidades.mostrarAlerta('Confirmación',data[0]["Msn"]);
                    this.navCtrl.pop();
                  }else{
                    this.Utilidades.mostrarAlerta('Error',data[0]["Msn"]);
                  }
                },(error) => {
                  console.log(error);
                }
              )
          }
        },
        {
          text: 'No',
          handler: () => {
            
          }
        }
      ]
    });
    alert.present();
  }
}
