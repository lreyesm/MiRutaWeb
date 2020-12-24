import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TareaFieldOptions } from 'src/app/classes/tarea-field-options';
import { Tarea } from 'src/app/interfaces/tarea';
import { GlobalfunctionsService } from 'src/app/services/globalfunctions.service';
import { RequestService } from 'src/app/services/request.service';
import { Location } from '@angular/common';
import { Cliente } from 'src/app/interfaces/cliente';

@Component({
  selector: 'app-tareas-search',
  templateUrl: './tareas-search.component.html',
  styleUrls: ['./tareas-search.component.css']
})
export class TareasSearchComponent implements OnInit {

  searchOptions: string[] = [];
  numberDisplayed: number = 500;
  numberPaginations: number = 0;
  countTareas: number = 0;
  tareas: Tarea[] = [];
  loading: boolean = false;
  empresa: string = "";
  field: string = null;
  value: string = null;
  cliente: Cliente;
  restricciones: JSON;
  query: string = "NUMIN <> 'NULL' ";
  jsonInfo: JSON = null;

  constructor(private _requestService: RequestService,
              private activeRoute: ActivatedRoute,
              private _globalFunctions: GlobalfunctionsService,
              private location: Location) { 
    this.loading = true;
    
    this.empresa = sessionStorage.getItem('empresa');      
    this.cliente = JSON.parse(sessionStorage.getItem('cliente'));    

    if(_globalFunctions.checkIfFieldIsValid(this.cliente.permisos)){
      if(_globalFunctions.isJson(this.cliente.permisos)){
        this.restricciones = JSON.parse(this.cliente.permisos);
        this.query = this._globalFunctions.getQueryWithRestricions(this.restricciones);
      }
    } 

    this.activeRoute.params.subscribe(params=>{
      //console.log("searchParameters", params['searchParameters']);
      // //console.log("value", params['value']);

      let parameters: any = JSON.parse(params['searchParameters']);

      this.field = parameters.field;
      this.value = parameters.value;

      this.query = " (" + this.query + ")" + " AND ("+ this.field + " LIKE '%" + this.value +"%') ";
      //console.log("this.field", this.field);
      //console.log("this.value", this.value);

      this._requestService.getTareasCustomQuery(this.empresa, this.query, 10000, 0).subscribe((data: any)=>{
          // //console.log("data", data);
          if(this._globalFunctions.isJson(data)){
            let jsonArray = JSON.parse(data);
            for(let i in jsonArray){
              // //console.log("data[i]", jsonArray[i]);
              this.tareas[i]= jsonArray[i];
            }     
            this.countTareas = this.tareas.length;  
            this.numberPaginations = Math.ceil(this.countTareas / this.numberDisplayed);
            this.loading = false;
          }else{
            this.loading = false;
          }
        });
    });

  }

  ngOnInit(): void {
  }

  // search(field: string, value: string){
  //   //console.log("Searching", field, value);
  // }
  back(): void {
    this.location.back();
  }
}
