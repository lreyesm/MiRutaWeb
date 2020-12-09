import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl'
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { GlobalfunctionsService } from 'src/app/services/globalfunctions.service';
import { Itac } from 'src/app/interfaces/itac';

@Component({
  selector: 'app-mapa-map-box-itac',
  templateUrl: './mapa-map-box-itac.component.html',
  styleUrls: ['./mapa-map-box-itac.component.css']
})
export class MapaMapBoxItacComponent implements OnInit {

  id: number;
  mapa: Mapboxgl.Map;
  lat: number = null;
  lng: number = null;

  itac: Itac;
  empresa: string = null;

  constructor(private _requestService: RequestService,
              private _globalFunctionsService: GlobalfunctionsService,
              private activeRoute: ActivatedRoute) { 
                
                this.empresa = sessionStorage.getItem('empresa');      
                //console.log("constructor TareasComponent", this.empresa);

                this.activeRoute.params.subscribe((params:any)=>{
                  //console.log("params",params);
                  this.id = params['id'];
                  //console.log("id",this.id);
                  
                  this._requestService.getItac(this.empresa, this.id).subscribe((itac:any)=>{
                      let jsonArray = JSON.parse(itac);
                      this.itac = jsonArray[0];

                      let lat = _globalFunctionsService.getLatitudItac(this.itac);
                      let lng = _globalFunctionsService.getLongitudItac(this.itac);
    
                      //console.log("lat", lat);
                      //console.log("lng", lng);
    
                      if(_globalFunctionsService.checkIfFieldIsValid(lat) 
                        && _globalFunctionsService.checkIfFieldIsValid(lng)){
                          let latNmb = Number(lat);
                          let lngNmb = Number(lng);
                          if(latNmb && lng){
                            this.lat = latNmb;
                            this.lng = lngNmb;
                          }
                      }
                      this.onGetItac();
                  });


                })
  }

  onGetItac(){
    if(this.lat && this.lng){
      //console.log("this.lat", this.lat);
      //console.log("this.lng", this.lng);
      let text: string = "";
      
      if(this._globalFunctionsService.checkIfFieldIsValid(this.itac.itac)){
        text = this.itac.itac;
        if(this._globalFunctionsService.checkIfFieldIsValid(this.itac.codigo_itac)){
          text = text + "      "+ this.itac.codigo_itac;
        }        
      }
      this.addMarker(this.lat, this.lng, text);
      //mover la camra a esta posicion
      let latLang = new Mapboxgl.LngLat( this.lng, this.lat);
      this.mapa.setCenter(latLang);
    }
  }

  ngOnInit(): void {
    let lat = 43.2630126; //Bilbao
    let lng = -2.9349852;
    // if(this.lat && this.lng){
    //   lat = this.lat;
    //   lng = this.lng;
    // }
    (Mapboxgl as any).accessToken = environment.mapboxKey;
    this.mapa = new Mapboxgl.Map({
    container: 'mapa-mapbox-itac', // container id
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [lng, lat], // starting position
    zoom: 16 // starting zoom
    });     
  }

  addMarker(lat: number, lng: number, text?: string){
    let popup: Mapboxgl.Popup;
    if(text){
      popup = new Mapboxgl.Popup({ offset: 25 }).setText(text);
    }
    const marker = new Mapboxgl.Marker({
      draggable: false
      })
      .setPopup(popup)
      .setLngLat([lng, lat])
      .addTo(this.mapa);      
      // marker.on('dragend', ()=>{ //Funcion para obtener el desplazamiento del marcador
      //   //console.log(marker.getLngLat());
      // });
  }

}
