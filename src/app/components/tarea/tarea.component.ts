import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tarea } from 'src/app/interfaces/tarea';
import { GlobalfunctionsService } from 'src/app/services/globalfunctions.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})
export class TareaComponent implements OnInit {
  
  id: number;
  tarea: Tarea;
  urlFolder: string = "";
  valid_coords: boolean = false;
  dirFolder: string;
  empresa: string = "";

  constructor(private _requestService: RequestService,
              private _globalfunctionsService: GlobalfunctionsService,
              private activatedRoute: ActivatedRoute) { 

                this.empresa = localStorage.getItem('empresa');      
                console.log("constructor TareasComponent", this.empresa);

                this.activatedRoute.params.subscribe(parametros=>{
                  console.log('id', parametros);
                  this.id = parametros['id'];
                  if(this.id != -1){
                    this._requestService.getTarea(this.empresa, this.id).subscribe((tarea: any)=>{
                      let jsonArray = JSON.parse(tarea);
                      this.tarea = jsonArray[0];
                      console.log("Tarea",this.tarea);
                      this.dirFolder = "Empresas/"+ this.empresa //GECONTA
                      +"/Gestores/"+this.tarea.GESTOR+"/fotos_tareas/" 
                      + this.tarea.Numero_de_ABONADO + "/" + this.tarea.ANOMALIA + "/";

                      this.urlFolder = _requestService.siteUrl + this.dirFolder;
                      console.log("Folder",this.urlFolder);
                      this.checkValidCoords();
                    });                    
                  }
                })
              }

  ngOnInit(): void {
  }

  checkValidCoords(){
    
    if(this._globalfunctionsService.checkIfFieldIsValid(this.tarea.geolocalizacion)
      || this._globalfunctionsService.checkIfFieldIsValid(this.tarea.codigo_de_localizacion)){
      this.valid_coords = true;
    }else{
      this.valid_coords = false;
    }
    console.log("checkValidCoords", this.valid_coords);
  }

  play(url:string)
  {
    console.log("play audio",url);
  }
}
