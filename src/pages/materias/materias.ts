import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AgregarMateriaPage } from '../agregar-materia/agregar-materia';
import { UnotesServiceProvider } from '../../providers/unotes-service/unotes-service';
import { UnotesUtilidadesProvider } from '../../providers/unotes-utilidades/unotes-utilidades';

@Component({
  selector: 'page-materias',
  templateUrl: 'materias.html',
})
export class MateriasPage {
  Parametros:any;
  Materias:any;
  notaMinima = 3.0;
  notaMaxima = 5.0;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,   
              public UNotesService: UnotesServiceProvider,
              public Utilidades:UnotesUtilidadesProvider) {

    this.Parametros = navParams.data
    //this.consultarMaterias();
  }

  modalMaterias(){
    this.navCtrl.push(AgregarMateriaPage,{data:{Id: this.Parametros.Id, Acc : 'Ins'}});
  }

  consultarMaterias(){
    this.UNotesService.ConsultarMaterias(this.Parametros.Id).subscribe(
      (data) => {
        this.Materias = data;
        //console.log(this.Materias);
        if(this.Materias == null){
          return;
        }
        let c = 0;
        for(let i of this.Materias){
          if(i.nota1 != 0 && i.nota2 != 0 && i.nota3==0){
            var porcentaje1 = (i.nota1 * i.porcentaje1) / 100;
            var porcentaje2 = (i.nota2 * i.porcentaje2) / 100;
            var diferencia = this.notaMinima - (porcentaje1 + porcentaje2);
            var resultado = (diferencia * this.notaMaxima) / ((this.notaMaxima * (100 - (porcentaje1 + porcentaje2)))/100);
            this.Materias[c]['necesitas'] = resultado.toFixed(2);  
          }else{
            if(i.nota1 != 0 && i.nota2 != 0 && i.nota3!=0){
              var porcentaje1 = (i.nota1 * i.porcentaje1) / 100;
              var porcentaje2 = (i.nota2 * i.porcentaje2) / 100;
              var porcentaje3 = (i.nota3 * i.porcentaje3) / 100;
              var resultado = (porcentaje1 + porcentaje2 + porcentaje3);
              this.Materias[c]['definitiva'] = resultado.toFixed(2);  
            }
          }
          c++;
        }
        //console.log(this.Materias);
      },(error) => {
        console.log(error);
      }
    )
  }
  updateMateria(i){
    this.navCtrl.push(AgregarMateriaPage,{data:i});
  }

  ionViewDidEnter(){
    this.consultarMaterias();
  }
}

