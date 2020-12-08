import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Tarea } from 'src/app/interfaces/tarea';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-tareasrange',
  templateUrl: './tareasrange.component.html',
  styleUrls: ['./tareasrange.component.css']
})


export class TareasrangeComponent implements OnInit {
  currentDisplayed: number = 1;
  numberDisplayed: number = 500;
  numberPaginations: number = 0;
  countTareas: number = 0;
  tareas: Tarea[] = [];
  loading: boolean = true;
  lastPage: boolean = false;
  empresa: string = "";
  
  constructor(private _requestService: RequestService,
              private router: Router,
              private activeRoute: ActivatedRoute) { 
    this.loading = true;

    this.empresa = localStorage.getItem('empresa');      
    console.log("constructor TareasrangeComponent", this.empresa);
    
    this.activeRoute.params.subscribe(params=>{
      console.log("id", params['id']);
      this.currentDisplayed = params['id']; //-1 porque en las consultas el OFFSET empieza en 0
      console.log("this.currentDisplayed", this.currentDisplayed);

      this._requestService.getTareasAmount(this.empresa).subscribe(data=>{
        this.countTareas = data;
        console.log("this.countTareas ", this.countTareas);
  
      });
      this._requestService.getTareas(this.empresa,this.numberDisplayed,
         (this.currentDisplayed-1) * this.numberDisplayed).subscribe((data:any)=>{
          let jsonArray = JSON.parse(data);
          for(let i in jsonArray){
            // console.log("data[i]", jsonArray[i]);
            this.tareas[i]= jsonArray[i];
          }  
          this.numberPaginations = Math.ceil(this.countTareas / this.numberDisplayed);
          if(Number(this.currentDisplayed)>= this.numberPaginations){
            this.lastPage = true;
          }else{
            this.lastPage = false;
          }
          this.loading = false;
      });
    });    

  }

  ngOnInit(): void {
  }

  // openTask(numero_interno: string){
  //   this.router.navigate(['/tarea', numero_interno]);
  // }

  openItacs(){
    console.log("Navigating to Itacs");
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
    console.log("currentDisplayed", this.currentDisplayed);
    console.log("Navigating to Previous Page", navigateTo);
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
    console.log("currentDisplayed", this.currentDisplayed);
    console.log("Navigating to Next Page", navigateTo);
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
    console.log("Navigating to Page", page);
  }


}
