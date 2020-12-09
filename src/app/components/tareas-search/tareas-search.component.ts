import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TareaFieldOptions } from 'src/app/classes/tarea-field-options';
import { Tarea } from 'src/app/interfaces/tarea';
import { RequestService } from 'src/app/services/request.service';

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
  
  constructor(private _requestService: RequestService,
              private activeRoute: ActivatedRoute) { 
    this.loading = true;
    
    this.empresa = sessionStorage.getItem('empresa');      
    //console.log("constructor TareasComponent", this.empresa);

    this.activeRoute.params.subscribe(params=>{
      //console.log("searchParameters", params['searchParameters']);
      // //console.log("value", params['value']);

      let parameters: any = JSON.parse(params['searchParameters']);

      this.field = parameters.field;
      this.value = parameters.value;

      //console.log("this.field", this.field);
      //console.log("this.value", this.value);

      this._requestService.getTareasWhere(this.empresa, this.field, this.value).subscribe((data: any)=>{
          // //console.log("data", data);
          let jsonArray = JSON.parse(data);
          for(let i in jsonArray){
            // //console.log("data[i]", jsonArray[i]);
            this.tareas[i]= jsonArray[i];
          }     
          this.countTareas = this.tareas.length;  
          this.numberPaginations = Math.ceil(this.countTareas / this.numberDisplayed);
          this.loading = false;
        });
    });

  }

  ngOnInit(): void {
  }

  // search(field: string, value: string){
  //   //console.log("Searching", field, value);
  // }

}
