import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Itac } from 'src/app/interfaces/itac';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-itacs',
  templateUrl: './itacs.component.html',
  styleUrls: ['./itacs.component.css']
})
export class ItacsComponent implements OnInit {

  currentDisplayed: number = 1;
  numberDisplayed: number = 500;
  numberPaginations: number = 0;
  countItacs: number = 0;
  itacs: Itac[] = [];
  loading: boolean = false;
  empresa: string = "";
  
  constructor(private _requestService: RequestService,
              private router: Router) { 
    this.loading = true;
    this.empresa = localStorage.getItem('empresa');      
    console.log("constructor ItacsComponent", this.empresa);
    
    this._requestService.getItacsAmount(this.empresa).subscribe(data=>{
      this.countItacs = data;
      console.log("this.countItacs ", this.countItacs);

    });

    this._requestService.getItacs(this.empresa, this.numberDisplayed, 0).subscribe((data: any)=>{
        let jsonArray = JSON.parse(data);
        for(let i in jsonArray){
          // console.log("data[i]", jsonArray[i]);
          this.itacs[i]= jsonArray[i];
        }        
        this.numberPaginations = Math.ceil(this.countItacs / this.numberDisplayed);
        this.loading = false;
      });

  }

  ngOnInit(): void {
  }

  openTareas(){
    console.log("Navigating to Tareas");
    this.router.navigate(['/tareas']);
  }

  openNextPage(){    
    this.loading = true;
    this.itacs = [];
    let navigateTo: string = (Number(this.currentDisplayed)+1).toString();
    console.log("currentDisplayed", this.currentDisplayed);
    console.log("Navigating to Next Page", navigateTo);
    this.router.navigate(['/itacsrange', navigateTo]);
  }

  openPage(page: number){ 
    page = page + 1;   
    this.loading = true;
    this.itacs = [];
    console.log("Navigating to Page", page);
  }

}
