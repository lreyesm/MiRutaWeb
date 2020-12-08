import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl'
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { Tarea } from 'src/app/interfaces/tarea';
import { GlobalfunctionsService } from 'src/app/services/globalfunctions.service';

@Component({
  selector: 'app-mapa-map-box',
  templateUrl: './mapa-map-box.component.html',
  styleUrls: ['./mapa-map-box.component.css']
})
export class MapaMapBoxComponent implements OnInit {

  id: number;
  mapa: Mapboxgl.Map;
  lat: number = null;
  lng: number = null;

  tarea: Tarea;

  constructor(private _requestService: RequestService,
              private _globalFunctionsService: GlobalfunctionsService,
              private activeRoute: ActivatedRoute) { 
                
                this.activeRoute.params.subscribe((params:any)=>{
                  console.log("params",params);
                  this.id = params['id'];
                  console.log("id",this.id);
                  
                  // this.tarea = this._requestService.getTarea(this.id);

                  let lat = _globalFunctionsService.getLatitudTarea(this.tarea);
                  let lng = _globalFunctionsService.getLongitudTarea(this.tarea);

                  console.log("lat", lat);
                  console.log("lng", lng);

                  if(_globalFunctionsService.checkIfFieldIsValid(lat) 
                    && _globalFunctionsService.checkIfFieldIsValid(lng)){
                      let latNmb = Number(lat);
                      let lngNmb = Number(lng);
                      if(latNmb && lng){
                        this.lat = latNmb;
                        this.lng = lngNmb;
                      }
                  }
                })
  }

  ngOnInit(): void {
    let lat = 43.2630126; //Bilbao
    let lng = -2.9349852;
    if(this.lat && this.lng){
      lat = this.lat;
      lng = this.lng;
    }
    (Mapboxgl as any).accessToken = environment.mapboxKey;
    this.mapa = new Mapboxgl.Map({
    container: 'mapa-mapbox', // container id
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [lng, lat], // starting position
    zoom: 16 // starting zoom
    });  
    
    if(this.lat && this.lng){
      console.log("this.lat", this.lat);
      console.log("this.lng", this.lng);
      let text: string = "";
      if(this._globalFunctionsService.checkIfFieldIsValid(this.tarea.MUNICIPIO)){
        text = this.tarea.MUNICIPIO;       
      }
      if(this._globalFunctionsService.checkIfFieldIsValid(this.tarea.CALLE)){
        text = text + " " + this.tarea.CALLE;
      } 
      if(this._globalFunctionsService.checkIfFieldIsValid(this.tarea.NUME)){
        text = text + " " + this.tarea.NUME;
      } 
      if(this._globalFunctionsService.checkIfFieldIsValid(this.tarea.Numero_de_ABONADO)){
        text = text + "   " + this.tarea.Numero_de_ABONADO;
      } 

      this.addMarker(this.lat, this.lng, text);
    }
    
  }

  addMarker(lat: number, lng: number, text?: string){
    let popup: Mapboxgl.Popup;
    if(text){
      popup = new Mapboxgl.Popup({ offset: 25 }).setText(text);
    }
    const marker = new Mapboxgl.Marker({
      draggable: false
      })
      // .setPopup(popup)
      .setLngLat([lng, lat])
      .addTo(this.mapa);      
      // marker.on('dragend', ()=>{ //Funcion para obtener el desplazamiento del marcador
      //   console.log(marker.getLngLat());
      // });
  }

}
