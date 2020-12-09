import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItacFieldOptions } from 'src/app/classes/itac-field-options';
import { Itac } from 'src/app/interfaces/itac';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-itacsrange',
  templateUrl: './itacsrange.component.html',
  styleUrls: ['./itacsrange.component.css']
})
export class ItacsrangeComponent implements OnInit {

  optionSelected: string = "Seleccione";
  searchOptions: string[] = [];
  currentDisplayed: number = 1;
  numberDisplayed: number = 500;
  numberPaginations: number = 0;
  countItacs: number = 0;
  itacs: Itac[] = [];
  loading: boolean = false;
  lastPage: boolean = false;
  empresa: string = "";
  
  constructor(private _requestService: RequestService,
              private router: Router,
              private activeRoute: ActivatedRoute) { 
    this.loading = true;

    let options = new ItacFieldOptions().searchOptionsValues;

    for (let option in options) {
      this.searchOptions.push(option);
    } 

    this.empresa = sessionStorage.getItem('empresa');      
    //console.log("constructor ItacsrangeComponent", this.empresa);

    this.activeRoute.params.subscribe(params=>{
      //console.log("id", params['id']);
      this.currentDisplayed = params['id']; //-1 porque en las consultas el OFFSET empieza en 0
      //console.log("this.currentDisplayed", this.currentDisplayed);
      
      this._requestService.getItacsAmount(this.empresa).subscribe(data=>{
        this.countItacs = data;
        //console.log("this.countItacs ", this.countItacs);  
      });

      this._requestService.getItacs(this.empresa, this.numberDisplayed, 0).subscribe((data: any)=>{
          let jsonArray = JSON.parse(data);
          for(let i in jsonArray){
            // //console.log("data[i]", jsonArray[i]);
            this.itacs[i]= jsonArray[i];
          }   
          this.numberPaginations = Math.ceil(this.countItacs / this.numberDisplayed);
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

  openTareas(){
    //console.log("Navigating to Tareas");
    this.router.navigate(['/tareas']);
  }

  openPreviousPage(){    
    this.loading = true;
    this.itacs = [];
    let navigateTo: string = (Number(this.currentDisplayed)-1).toString();
    if(Number(navigateTo)>= this.numberPaginations){
      this.lastPage = true;
    }else{
      this.lastPage = false;
    }
    //console.log("currentDisplayed", this.currentDisplayed);
    //console.log("Navigating to Previous Page", navigateTo);
    this.router.navigate(['/itacsrange', navigateTo]);
  }
  openNextPage(){    
    this.loading = true;
    this.itacs = [];
    let navigateTo: string = (Number(this.currentDisplayed)+1).toString();

    if(Number(navigateTo)>= this.numberPaginations){
      this.lastPage = true;
    }else{
      this.lastPage = false;
    }
    //console.log("currentDisplayed", this.currentDisplayed);
    //console.log("Navigating to Next Page", navigateTo);
    this.router.navigate(['/itacsrange', navigateTo]);
  }

  openPage(page: number){ 
    page = page + 1;   
    if(Number(page)>= this.numberPaginations){
      this.lastPage = true;
    }else{
      this.lastPage = false;
    }
    this.loading = true;
    this.itacs = [];
    //console.log("Navigating to Page", page);
  }
  
  selectedOption(option: string){
    this.optionSelected = option;
  }

  search(field: string, value: string){
    if(value){
      value = value.trim();
      let searchOptions = new ItacFieldOptions().searchOptionsValues;
      if (searchOptions.hasOwnProperty(field)) {
        field = searchOptions[field];
        //console.log("Searching", field, value);
        let parameters = {field: field, value: value};
        this.router.navigate(['/itacs-search', JSON.stringify(parameters)]);
      }
    }
  }
}
