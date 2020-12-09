import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Itac } from '../interfaces/itac';
import { Tarea } from '../interfaces/tarea';

@Injectable({
  providedIn: 'root'
})
export class GlobalfunctionsService {

  constructor() { }

  doesFileExist(urlToFile) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();     
    
    if (xhr.status == 404) {
        //console.log("status false", status);
        return false;
    } else {
        //console.log("status true", status);
        return true;
    }
  }

  fileExist(urlToFile : string){
    let xhr = new XMLHttpRequest();
    xhr.open("GET", urlToFile, true);

    //console.log("fileExist", urlToFile, "----------------------------------")
    xhr.send();
        if(xhr.status == 404)  {
            throw new Error(urlToFile + ' replied 404');
            //console.log("replied 404", xhr.status, "----------------------------------")
        }else{
          //console.log("pagina encontrada", xhr.status, "----------------------------------")
        }
    
  }

  isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }
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
