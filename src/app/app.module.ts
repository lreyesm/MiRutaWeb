import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


///Rutas////////////////////////////////////////////////////////////////////////
import { APP_ROUTING } from './app.routes';


///Modulos///////////////////////////////////////////////////////////////////
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core'; //Mapas Mapbox
import { AuthModule, AuthService } from '@auth0/auth0-angular'; //Autenticación
import { AngularFireModule } from '@angular/fire'; //Autenticación
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

////Components/////////////////////////////////////////////////////////////////////
import { AppComponent } from './app.component';
import { TareasComponent } from './components/tareas/tareas.component';
import { TareaComponent } from './components/tarea/tarea.component';
import { ItacsComponent } from './components/itacs/itacs.component';
import { ItacComponent } from './components/itac/itac.component';
import { TareasrangeComponent } from './components/tareasrange/tareasrange.component';
import { ItacsrangeComponent } from './components/itacsrange/itacsrange.component';
import { MapasComponent } from './components/mapas/mapas.component';
import { MapaMapBoxComponent } from './components/mapa-map-box/mapa-map-box.component';
import { MapaMapBoxItacComponent } from './components/mapa-map-box-itac/mapa-map-box-itac.component';
import { MapaMapBoxTareaComponent } from './components/mapa-map-box-tarea/mapa-map-box-tarea.component';
import { ZoomImageComponent } from './components/zoom-image/zoom-image.component';
import { MapaMapBoxTareaMiniComponent } from './components/mapa-map-box-tarea-mini/mapa-map-box-tarea-mini.component';
import { MapaMapBoxItacMiniComponent } from './components/mapa-map-box-itac-mini/mapa-map-box-itac-mini.component';

///Pipes////////////////////////////////////////////////////////////////////
import { DomseguroPipe } from './pipes/domseguro.pipe';
import { DisplaystatusPipe } from './pipes/displaystatus.pipe';
import { RangePipe } from './pipes/range.pipe';
import { RequestService } from './services/request.service';
import { GlobalfunctionsService } from './services/globalfunctions.service';
import { FirebaseService } from './services/firebase.service';
import { LogDirective } from './directives/log.directive';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { KeysPipe } from './pipes/keys.pipe';
import { AuthGuardService } from './services/auth-guard.service';
import { TareasSearchComponent } from './components/tareas-search/tareas-search.component';
import { ItacsSearchComponent } from './components/itacs-search/itacs-search.component';
import { NavBarContactComponent } from './components/nav-bar-contact/nav-bar-contact.component';
import { InterceptorService } from './interceptors/interceptor.service';



// var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

// mapboxgl.accessToken = 'pk.eyJ1IjoiZWxhdXRvbWF0aWNvbiIsImEiOiJja2c5dWcweDAwMHZoMnltdTgzNHoyOGQ3In0.wYXUSb63FWZWWiZPEEcpsA';
// var map = new mapboxgl.Map({
//   container: 'YOUR_CONTAINER_ELEMENT_ID',
//   style: 'mapbox://styles/mapbox/streets-v11'
// });

@NgModule({
  declarations: [
    AppComponent,
    TareasComponent,
    TareaComponent,
    ItacsComponent,
    ItacComponent,
    DisplaystatusPipe,
    RangePipe,
    DomseguroPipe,
    TareasrangeComponent,
    ItacsrangeComponent,
    MapasComponent,
    MapaMapBoxComponent,
    MapaMapBoxItacComponent,
    MapaMapBoxTareaComponent,
    ZoomImageComponent,
    MapaMapBoxTareaMiniComponent,
    MapaMapBoxItacMiniComponent,
    LogDirective,
    NavBarComponent,
    KeysPipe,
    TareasSearchComponent,
    ItacsSearchComponent,
    NavBarContactComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AuthModule.forRoot({
      domain: 'lreyesm.us.auth0.com',
      clientId: 'PZq1NMMOV1TLKI2oC2rH6AqcIkaAYDmP'
    }),
    APP_ROUTING,
    HttpClientModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBwsV3gu9Peg4PR2iJa4u0nJ0btu9uFmj4",
      authDomain: "mi-ruta-94617.firebaseapp.com",
      projectId: "mi-ruta-94617",
      storageBucket: "mi-ruta-94617.appspot.com",
      messagingSenderId: "776738846993",
      appId: "1:776738846993:web:60a8c058eb34e17b8974b0"
     }),
    AgmCoreModule.forRoot({ ///Mapas mapbox
      apiKey: 'AIzaSyB5bZqJC5-_zC-9ojevIrrcifbc90_B5aM'
    })
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    AuthService, 
    RequestService, 
    GlobalfunctionsService,
    FirebaseService,
    AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
