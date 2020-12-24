import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TareasComponent } from './components/tareas/tareas.component';
import { TareaComponent } from './components/tarea/tarea.component';
import { TareasrangeComponent } from './components/tareasrange/tareasrange.component';
import { ItacsComponent } from './components/itacs/itacs.component';
import { ItacComponent } from './components/itac/itac.component';
import { ItacsrangeComponent } from './components/itacsrange/itacsrange.component';
import { MapasComponent } from './components/mapas/mapas.component';
import { MapaMapBoxComponent } from './components/mapa-map-box/mapa-map-box.component';
import { MapaMapBoxItacComponent } from './components/mapa-map-box-itac/mapa-map-box-itac.component';
import { MapaMapBoxTareaComponent } from './components/mapa-map-box-tarea/mapa-map-box-tarea.component';
import { ZoomImageComponent } from './components/zoom-image/zoom-image.component';
import { MapaMapBoxTareaMiniComponent } from './components/mapa-map-box-tarea-mini/mapa-map-box-tarea-mini.component';
import { MapaMapBoxItacMiniComponent } from './components/mapa-map-box-itac-mini/mapa-map-box-itac-mini.component';
import { TareasSearchComponent } from './components/tareas-search/tareas-search.component';
import { ItacsSearchComponent } from './components/itacs-search/itacs-search.component';


// import { AuthGuardService } from './services/auth-guard.service';

const APP_ROUTES: Routes = [
    { path: 'tareas', component: TareasComponent/* , canActivate: [ AuthGuardService ] */ },
    { path: 'mapas', component: MapasComponent },
    { path: 'zoomImage/:id', component: ZoomImageComponent },
    { path: 'mapasMapbox/:id', component: MapaMapBoxComponent },    
    { path: 'mapasMapboxTareaMini/:id', component: MapaMapBoxTareaMiniComponent },    
    { path: 'mapasMapboxItacMini/:id', component: MapaMapBoxItacMiniComponent },
    { path: 'mapasMapboxItac/:id', component: MapaMapBoxItacComponent },
    { path: 'mapasMapboxTarea/:id', component: MapaMapBoxTareaComponent },
    // { path: 'itacs', component: ItacsComponent },
    { path: 'tarea/:id', component: TareaComponent },
    { path: 'itac/:id', component: ItacComponent },
    { path: 'tareasrange/:id', component: TareasrangeComponent},
    { path: 'tareas-search/:searchParameters', component: TareasSearchComponent},    
    // { path: 'itacs-search/:searchParameters', component: ItacsSearchComponent},
    // { path: 'itacsrange/:id', component: ItacsrangeComponent},
    { path: '**', pathMatch: 'full', redirectTo: 'tareas' },

    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash: true});