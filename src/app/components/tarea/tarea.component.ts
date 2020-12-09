import { ItacFieldOptions } from 'src/app/classes/itac-field-options';
import { TareaFieldOptions } from './../../classes/tarea-field-options';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Itac } from 'src/app/interfaces/itac';
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
  itac: Itac = null;
  foto_antes: string;

  constructor(public _requestService: RequestService,
              private _globalfunctionsService: GlobalfunctionsService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {

                this.empresa = sessionStorage.getItem('empresa');
                //console.log("constructor TareasComponent", this.empresa);

                this.activatedRoute.params.subscribe(parametros=>{
                  //console.log('id', parametros);
                  this.id = parametros['id'];
                  if(this.id != -1){
                    this._requestService.getTarea(this.empresa, this.id).subscribe((tarea: any)=>{
                      if(this._globalfunctionsService.isJson(tarea)){
                        let jsonArray = JSON.parse(tarea);
                        this.tarea = jsonArray[0];
                        // //console.log("Tarea",this.tarea);
                        if(this.tarea){
                          this.dirFolder = "Empresas/"+ this.empresa //GECONTA
                          +"/Gestores/"+this.tarea.GESTOR+"/fotos_tareas/"
                          + this.tarea.Numero_de_ABONADO + "/" + this.tarea.ANOMALIA + "/";

                          this.urlFolder = this._requestService.siteUrl + this.dirFolder;
                          //console.log("Folder",this.urlFolder);
                          // this._requestService.checkIfFileExists(this.urlFolder, this.urlFolder, this.tarea.foto_antes_instalacion).subscribe(res=>{
                          //   //console.log("getFileStatus", res);
                          //   this.foto_antes = res;
                          // });
                          this.checkValidCoords();
                          let cod_emplazamiento = this.tarea.codigo_de_geolocalizacion;
                          if(this._globalfunctionsService.checkIfFieldIsValid(cod_emplazamiento)){
                            this._requestService.getItacsWhere(this.empresa, new ItacFieldOptions().codigo_itac, cod_emplazamiento).subscribe((itacs: any)=>{
                              if(this._globalfunctionsService.isJson(itacs)){
                                let jsonArray = JSON.parse(itacs);
                                if(jsonArray){
                                  this.itac = jsonArray[0];
                                  //console.log("Itac",this.itac);
                                }
                              }
                            })
                          }
                        }else{
                          router.navigate(['/tareas']);
                        }
                      }else{
                        router.navigate(['/tareas']);
                      }
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
    //console.log("checkValidCoords", this.valid_coords);
  }

  play(url:string)
  {
    //console.log("play audio",url);
  }
}
