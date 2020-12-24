import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TareaFieldOptions } from 'src/app/classes/tarea-field-options';
import { Cliente } from 'src/app/interfaces/cliente';
import { Tarea } from 'src/app/interfaces/tarea';
import { GlobalfunctionsService } from 'src/app/services/globalfunctions.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {

  optionSelected: string = "Seleccione";
  searchOptions: string[] = [];
  numberDisplayed: number = 500;
  numberPaginations: number = 0;
  countTareas: number = 0;
  tareas: Tarea[] = [];
  loading: boolean = false;
  currentPage: number = 1;
  empresa: string = "";
  cliente: Cliente;
  restricciones: JSON;
  query: string = "NUMIN <> 'NULL'";
  
  constructor(private _requestService: RequestService,
              private router: Router,
              private _globalFunctions: GlobalfunctionsService) { 
    this.loading = true;

    this.router.navigate(['/tareasrange', '1']);
    // let options = new TareaFieldOptions().searchOptionsValues;

    // for (let option in options) {
    //   this.searchOptions.push(option);
    // } 

    // this.empresa = sessionStorage.getItem('empresa');   
    // this.cliente = JSON.parse(sessionStorage.getItem('cliente')) 
    // if(_globalFunctions.checkIfFieldIsValid(this.cliente.permisos)){
    //   if(_globalFunctions.isJson(this.cliente.permisos)){
    //     this.restricciones = JSON.parse(this.cliente.permisos);
    //     this.query = this._globalFunctions.getQueryWithRestricions(this.restricciones);
    //   }
    // }
    
    ////  console.log("query ", this.query, "-------------------------------"); 
    // //console.log("constructor TareasComponent", this.empresa);
    
    // this._requestService.getTareasAmountCustomQuery(this.empresa, this.query).subscribe(data=>{
    //   this.countTareas = data;
    //   //console.log("this.countTareas ", this.countTareas);

    // });

    // this._requestService.getTareasCustomQuery(this.empresa, this.query, this.numberDisplayed, 0).subscribe((data: any)=>{
    //   let jsonArray = JSON.parse(data);
    //   for(let i in jsonArray){
    //    //  console.log("data[i]", jsonArray[i]);
    //     this.tareas[i] = jsonArray[i];
    //   }        
    //   this.numberPaginations = Math.ceil(this.countTareas / this.numberDisplayed);
    //   this.loading = false;
    // });

  }

  ngOnInit(): void {
  }

  openItacs(){
    //console.log("Navigating to Itacs");
    this.router.navigate(['/itacs']);
  }
  openPreviousPage(){

  }
  openNextPage(){    
    this.tareas = [];
    //console.log("Navigating to Next Page");
    this.router.navigate(['/tareasrange', Number(this.currentPage)+1]);
  }

  openPage(page: number){  
    page = page + 1;  
    this.loading = true;
    this.tareas = [];
    //console.log("Navigating to Page", page);
  }

  selectedOption(option: string){
    this.optionSelected = option;
  }

  search(field: string, value: string){
    if(value){
      value = value.trim();
      let tareaOptions = new TareaFieldOptions();
      let searchOptions = tareaOptions.searchOptionsValues;
      if (searchOptions.hasOwnProperty(field)) {
        field = searchOptions[field];
        if(field == tareaOptions.status_tarea){
          let statuses = tareaOptions.statuses;
          for (let st in statuses) {
            if (statuses.hasOwnProperty(st)) {
              //console.log("------------------------------");
              //console.log("toCompare",statuses[st], "Value",value);
              //console.log(statuses[st][0].toLowerCase(), value[0].toLowerCase());
              if(statuses[st][0].toLowerCase().includes(value[0].toLowerCase())){
                value = st;
                break;
                //console.log("iguales");
              }else{
                //console.log("no iguales---------------");
              }
            }
          } 
        }          
        //console.log("Searching", field, value);
        let parameters = {field: field, value: value};
        this.router.navigate(['/tareas-search', JSON.stringify(parameters)]);  
      }
    }
  }

}
