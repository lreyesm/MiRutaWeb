import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Itac } from 'src/app/interfaces/itac';
import { GlobalfunctionsService } from 'src/app/services/globalfunctions.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-itac',
  templateUrl: './itac.component.html',
  styleUrls: ['./itac.component.css']
})
export class ItacComponent implements OnInit {

  id: number;
  itac: Itac;
  urlFolder: string = "";
  valid_coords: boolean = false;
  dirFolder: string="";
  empresa: string = "";

  constructor(private _requestService: RequestService,
              private _globalfunctionsService: GlobalfunctionsService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { 

                this.empresa = sessionStorage.getItem('empresa');
      
                //console.log("constructor ItacComponent", this.empresa);

                this.activatedRoute.params.subscribe(parametros=>{
                  //console.log(parametros);
                  this.id = parametros['id'];
                  if(this.id != -1){
                    this._requestService.getItac(this.empresa, this.id).subscribe((itac: any)=>{                      
                      let jsonArray = JSON.parse(itac);
                      this.itac = jsonArray[0];

                      //console.log("Itac",this.itac);

                      if(this.itac){
                        this.dirFolder = "Empresas/"+this.empresa //GECONTA
                        +"/Gestores/"+this.itac.gestor+"/fotos_ITACs/" 
                        + this.itac.codigo_itac + "/";

                        this.urlFolder = _requestService.siteUrl + this.dirFolder
                        //console.log("Folder",this.urlFolder);
                        this.checkValidCoords();
                      }else{
                        router.navigate(['/itacs']);
                      }
                    });
                    
                  }
                })
              }

  ngOnInit(): void {
  }

  checkValidCoords(){
    if(this._globalfunctionsService.checkIfFieldIsValid(this.itac.geolocalizacion)){
      this.valid_coords = true;
    }else{
      this.valid_coords = false;
    }
  }
}
