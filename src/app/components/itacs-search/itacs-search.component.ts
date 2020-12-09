import { GlobalfunctionsService } from './../../services/globalfunctions.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Itac } from 'src/app/interfaces/itac';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-itacs-search',
  templateUrl: './itacs-search.component.html',
  styleUrls: ['./itacs-search.component.css']
})
export class ItacsSearchComponent implements OnInit {

  searchOptions: string[] = [];
  numberDisplayed: number = 500;
  numberPaginations: number = 0;
  countItacs: number = 0;
  itacs: Itac[] = [];
  loading: boolean = false;
  empresa: string = "";
  field: string = null;
  value: string = null;

  constructor(private _requestService: RequestService,
              private activeRoute: ActivatedRoute,
              private _globalfunctionsService: GlobalfunctionsService) {
    this.loading = true;

    this.empresa = sessionStorage.getItem('empresa');
    //console.log("constructor ItacsSearchComponent", this.empresa);

    this.activeRoute.params.subscribe(params=>{
      //console.log("searchParameters", params['searchParameters']);
      // //console.log("value", params['value']);

      let parameters: any = JSON.parse(params['searchParameters']);

      this.field = parameters.field;
      this.value = parameters.value;

      //console.log("this.field", this.field);
      //console.log("this.value", this.value);

      this._requestService.getItacsWhere(this.empresa, this.field, this.value).subscribe((data: any)=>{
          // //console.log("data", data);
          if(this._globalfunctionsService.isJson(data)){
            let jsonArray = JSON.parse(data);
            for(let i in jsonArray){
              // //console.log("data[i]", jsonArray[i]);
              this.itacs[i]= jsonArray[i];
            }
            this.countItacs = this.itacs.length;
            this.numberPaginations = Math.ceil(this.countItacs / this.numberDisplayed);
          }
          this.loading = false;
        });
    });

  }

  ngOnInit(): void {
  }

}
