import { Injectable } from '@angular/core';
import { Itac } from '../interfaces/itac';
import { Tarea } from '../interfaces/tarea';

@Injectable({
  providedIn: 'root'
})
export class GlobalfunctionsService {

  constructor() { }

  getLatitudTarea(tarea: Tarea):string{
    let lng: string = "";
    let geoCode: string = this.getGeoCodeFromTarea(tarea);
    if(this.checkIfFieldIsValid(geoCode)){
      let split = geoCode.trim().split(",", 2);
      if(split.length > 1){
        lng = split[0].trim();
      }
    }
    return lng;
  }
  getLongitudTarea(tarea: Tarea):string{
    let lat: string = "";
    let geoCode: string = this.getGeoCodeFromTarea(tarea);
    if(this.checkIfFieldIsValid(geoCode)){
      let split = geoCode.trim().split(",", 2);
      if(split.length > 1){
        lat = split[1].trim();
      }
    }
    return lat;    
  }
  getLatitudItac(itac: Itac):string{
    let lng: string = "";
    let geoCode: string = this.getGeoCodeFromItac(itac);
    if(this.checkIfFieldIsValid(geoCode)){
      let split = geoCode.trim().split(",", 2);
      if(split.length > 1){
        lng = split[0].trim();
      }
    }
    return lng;
  }
  getLongitudItac(itac: Itac):string{
    let lat: string = "";
    let geoCode: string = this.getGeoCodeFromItac(itac);
    if(this.checkIfFieldIsValid(geoCode)){
      let split = geoCode.trim().split(",", 2);
      if(split.length > 1){
        lat = split[1].trim();
      }
    }
    return lat;    
  }
  getGeoCodeFromTarea(tarea: Tarea): string{
    let geoCode: string = tarea.codigo_de_localizacion;
    if(!this.checkIfFieldIsValid(geoCode)){
      geoCode = tarea.geolocalizacion;
    }
    return geoCode;
  }
  getGeoCodeFromItac(itac: Itac): string{
    let geoCode: string = itac.geolocalizacion;
    return geoCode;
  }
  checkIfFieldIsValid(value: string): boolean{
    if(value == null || value == "null" || value == "NULL" || value.trim() === ""){
      return false;
    }
    return true;
  }
}
