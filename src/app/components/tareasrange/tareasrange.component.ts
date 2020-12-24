import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { off } from 'process';
import { Observable } from 'rxjs';
import { TareaFieldOptions } from 'src/app/classes/tarea-field-options';
import { Cliente } from 'src/app/interfaces/cliente';
import { Tarea } from 'src/app/interfaces/tarea';
import { GlobalfunctionsService } from 'src/app/services/globalfunctions.service';
import { RequestService } from 'src/app/services/request.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tareasrange',
  templateUrl: './tareasrange.component.html',
  styleUrls: ['./tareasrange.component.css']
})


export class TareasrangeComponent implements OnInit {
  
  optionSelected: string = "Seleccione";
  searchOptions: string[] = [];
  currentDisplayed: number = 1;
  numberDisplayed: number = 500;
  numberPaginations: number = 0;
  countTareas: number = 0;
  tareas: Tarea[] = [];
  loading: boolean = true;
  lastPage: boolean = false;
  empresa: string = "";
  cliente: Cliente;
  restricciones: JSON;
  query: string = "NUMIN <> 'NULL'";
  jsonInfo: JSON = null;

  constructor(private _requestService: RequestService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private _globalFunctions: GlobalfunctionsService,
              private location: Location) { 
    this.loading = true;

    let options = new TareaFieldOptions().searchOptionsValues;

    for (let option in options) {
      this.searchOptions.push(option);
    } 

    this.empresa = sessionStorage.getItem('empresa');   
    this.cliente = JSON.parse(sessionStorage.getItem('cliente'));    

    if(_globalFunctions.checkIfFieldIsValid(this.cliente.permisos)){
      if(_globalFunctions.isJson(this.cliente.permisos)){
        this.restricciones = JSON.parse(this.cliente.permisos);
        this.query = this._globalFunctions.getQueryWithRestricions(this.restricciones);
      }
    }     
    //console.log("constructor TareasrangeComponent", this.empresa);
    
    this.activeRoute.params.subscribe(params=>{
      //console.log("id", params['id']);
      if(params){
        this.currentDisplayed = params['id']; //-1 porque en las consultas el OFFSET empieza en 0
      }
      //console.log("this.currentDisplayed", this.currentDisplayed);

      this._requestService.getTareasAmountCustomQuery(this.empresa, this.query).subscribe(data=>{
        this.countTareas = data;
        this.jsonInfo = JSON.parse(sessionStorage.getItem('jsonInfoCountTareas')); 
       //  console.log("this.countTareas ", this.countTareas);  

        let offset = (this.currentDisplayed-1) * this.numberDisplayed;

        if(offset === 0){
          offset = 1;
        }
       //  console.log("offset", offset, "-----------------------------------------------------------------");
       //  console.log("this.jsonInfo["+"id_"+ offset.toString()+"]", this.jsonInfo["id_"+ offset.toString()], "-----------------------------------------------------------------");
        let id_start = Number(this.jsonInfo["id_"+ offset.toString()]);
        
        this._requestService.getTareasCustomQuery(this.empresa, this.query,
          this.numberDisplayed, id_start).subscribe((data:any)=>{
            if(this._globalFunctions.isJson(data)){
              let jsonArray = JSON.parse(data);
              for(let i in jsonArray){
                // //console.log("data[i]", jsonArray[i]);
                this.tareas[i]= jsonArray[i];
              }  
              this.numberPaginations = Math.ceil(this.countTareas / this.numberDisplayed);
             //  console.log("numberPaginations", this.numberPaginations, "-----------------------------------------------------------------");
             //  console.log("countTareas", this.countTareas, "-----------------------------------------------------------------");
              if(Number(this.currentDisplayed)>= this.numberPaginations){
                this.lastPage = true;
              }else{
                this.lastPage = false;
              }
              this.loading = false;
            }else{
              this.loading = false;
            }
        });
      });
      
      
    });    

  }

  ngOnInit(): void {
  }

  // openTask(numero_interno: string){
  //   this.router.navigate(['/tarea', numero_interno]);
  // }

  openItacs(){
    //console.log("Navigating to Itacs");
    this.router.navigate(['/itacs']);
  }

  openPreviousPage(){    
    this.loading = true;
    this.tareas = [];
    let navigateTo: string = (Number(this.currentDisplayed)-1).toString();
    if(Number(navigateTo)>= this.numberPaginations){
      this.lastPage = true;
    }else{
      this.lastPage = false;
    }
    //console.log("currentDisplayed", this.currentDisplayed);
    //console.log("Navigating to Previous Page", navigateTo);
    this.router.navigate(['/tareasrange', navigateTo]);
  }
  openNextPage(){    
    this.loading = true;
    this.tareas = [];
    let navigateTo: string = (Number(this.currentDisplayed)+1).toString();
    if(Number(navigateTo)>= this.numberPaginations){
      this.lastPage = true;
    }else{
      this.lastPage = false;
    }
    //console.log("currentDisplayed", this.currentDisplayed);
    //console.log("Navigating to Next Page", navigateTo);
    this.router.navigate(['/tareasrange', navigateTo]);
  }

  openPage(page: number){ 
    page = page + 1;   
    if(Number(page)>= this.numberPaginations){
      this.lastPage = true;
    }else{
      this.lastPage = false;
    }
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
              if(statuses[st][0].toLowerCase().includes(value[0].toLowerCase())){
                value = st;
                break;
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

  back(): void {
    this.location.back();
  }

}
