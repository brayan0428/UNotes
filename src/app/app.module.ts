import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { RegistroPage } from '../pages/registro/registro';
import { PeriodosPage } from '../pages/periodos/periodos';
import { MateriasPage } from '../pages/materias/materias';
import {AgregarPeriodoPage} from '../pages/agregar-periodo/agregar-periodo';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UnotesServiceProvider } from '../providers/unotes-service/unotes-service';
import { UnotesUtilidadesProvider } from '../providers/unotes-utilidades/unotes-utilidades';
import { AgregarMateriaPage } from '../pages/agregar-materia/agregar-materia';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegistroPage,
    PeriodosPage,
    MateriasPage,
    AgregarPeriodoPage,
    AgregarMateriaPage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegistroPage,
    PeriodosPage,
    MateriasPage,
    AgregarPeriodoPage,
    AgregarMateriaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UnotesServiceProvider,
    UnotesUtilidadesProvider
  ]
})
export class AppModule {}
