import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Tarea } from 'src/app/interfaces/tarea';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {

  numberDisplayed: number = 500;
  numberPaginations: number = 0;
  countTareas: number = 0;
  tareas: Tarea[] = [];
  loading: boolean = false;
  currentPage: number = 1;
  empresa: string = "";
  
  constructor(private _requestService: RequestService,
              private router: Router) { 
    this.loading = true;

    this.empresa = localStorage.getItem('empresa');      
    console.log("constructor TareasComponent", this.empresa);
    
    this._requestService.getTareasAmount(this.empresa).subscribe(data=>{
      this.countTareas = data;
      console.log("this.countTareas ", this.countTareas);

    });

    this._requestService.getTareas(this.empresa, this.numberDisplayed, 0).subscribe((data: any)=>{
        let jsonArray = JSON.parse(data);
        for(let i in jsonArray){
          // console.log("data[i]", jsonArray[i]);
          this.tareas[i]= jsonArray[i];
        }        
        this.numberPaginations = Math.ceil(this.countTareas / this.numberDisplayed);
        this.loading = false;
      });

  }

  ngOnInit(): void {
  }

  openItacs(){
    console.log("Navigating to Itacs");
    this.router.navigate(['/itacs']);
  }
  openPreviousPage(){

  }
  openNextPage(){    
    this.tareas = [];
    console.log("Navigating to Next Page");
    this.router.navigate(['/tareasrange', Number(this.currentPage)+1]);
  }

  openPage(page: number){  
    page = page + 1;  
    this.loading = true;
    this.tareas = [];
    console.log("Navigating to Page", page);
  }

}
