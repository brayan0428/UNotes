import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { UnotesServiceProvider } from '../../providers/unotes-service/unotes-service';
import { UnotesUtilidadesProvider } from '../../providers/unotes-utilidades/unotes-utilidades';

@IonicPage()
@Component({
  selector: 'page-agregar-periodo',
  templateUrl: 'agregar-periodo.html',
})
export class AgregarPeriodoPage {
  nombre:String = '';
  descripcion:String='';

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public view: ViewController,
              public UNotesService: UnotesServiceProvider,
              public Utilidades:UnotesUtilidadesProvider) {
  }


  agregarProducto(){
    if(this.nombre.trim() == ''){
      this.Utilidades.mostrarAlerta('Error','Debe ingresar el nombre del periodo');
      return;
    }
    if(this.descripcion.trim() == ''){
      this.Utilidades.mostrarAlerta('Error','Debe ingresar una descripción');
      return;
    }
    this.UNotesService.IngresarProducto(this.UNotesService.IdEst,this.nombre.trim(),this.descripcion.trim())
    .subscribe(
      (data) => {
        //console.log(data);
        if(data[0]["Result"] == "True"){
          this.Utilidades.mostrarAlerta('Confirmación',data[0]["Msn"]);
          this.cerrarModal();
        }else{
          this.Utilidades.mostrarAlerta('Error',data[0]["Msn"]);
        }
      },
      (error) =>{
        console.error(error);
      }
    ) 
  }

  cerrarModal(){
    this.view.dismiss();
  }
}
