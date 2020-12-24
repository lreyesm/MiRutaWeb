import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tarea } from 'src/app/interfaces/tarea';
import { catchError, map } from 'rxjs/operators';
import { stringify } from 'querystring';
import { Itac } from '../interfaces/itac';
import { Cliente } from '../interfaces/cliente';
import { Observable, of, throwError } from 'rxjs';
import { GlobalfunctionsService } from './globalfunctions.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  countTareas: number = 0;
  countItacs: number = 0;
  tareas: Tarea[]=[];
  tarea: Tarea;
  itacs: Itac[]=[];
  cliente: Cliente;
  itac: Itac;
  empresa: string = "";
  searchResult: any[];

  public siteUrl = 'https://mywateroute.com/Mi_Ruta/';
  //siteUrl = 'http://localhost/';

  constructor(private http: HttpClient,
              private _globalFunctions: GlobalfunctionsService) { 
      //console.log("constructor RequestService");
  }

  getFolder(subFolder: string): Observable<string> {
    return this.http
      .get(`${subFolder}5060214370141_foto_despues_instalacion.jpg`, { observe: 'response', responseType: 'blob' })
      .pipe(
        map(response => {
          return subFolder;
        }),
        catchError(error => {
          return of('assets/folder/default');
        })
      );
  }

  checkIfFileExists(path: string, patchExtra: string, namePhoto: string): Observable<string>{
    const data = new FormData();  
    const options  = {
      headers: new HttpHeaders({
        'Accept': '*/*'
      })
      , responseType: 'text' as 'text'
    };
    return this.http.post(path + namePhoto, data, options)
      .pipe(map((res:any)=>{
        if(res){
          //console.log("Found----------", path + namePhoto);
          return path + namePhoto;
        }else{
          //console.log("No tFound----------", patchExtra + namePhoto);
          return patchExtra + namePhoto;
        }        
      })
    );
  } 

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.error.message}`;
    } else {
        // server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //console.log('handleError', errorMessage);
    return throwError(errorMessage);
  }

  loginCliente(empresa: string, user_name: string, password: string){
    let script = 'login_cliente.php'
    const url = this.siteUrl + script
    //console.log(url);

    const data = new FormData()     
    data.append('user_name',user_name);  
    data.append('password',password);  
    data.append('empresa', empresa);  

    const options  = {
      headers: new HttpHeaders({
        'Accept': '*/*'
      })
      , responseType: 'text' as 'text'
    };

    return this.http.post(url, data, options).pipe(map((res:string)=>{
      //console.log("loginCliente", empresa, res);
      if(res.includes("not success")){
        return null;
      }else{
        this.cliente = JSON.parse(res)[0];
        return this.cliente;
      }     
      
    }));
  }

  getItacsAmount(empresa: string){
    let script = 'get_itacs_amount.php'
    const url = this.siteUrl + script

    const data = new FormData()
    data.append('empresa', empresa);  

    const options  = {
      headers: new HttpHeaders({
        'Accept': '*/*'
      })
      , responseType: 'text' as 'text'
    };

    return this.http.post(url, data, options).pipe(map((res:string)=>{
      //console.log("getCountItacs", res);
      let split = res.split(":");
      let count: number = 0;
      if(split.length > 1){
        count = Number(split[1].trim());
      }
      this.countItacs = count;
      return count;
    }));
  }
  getItacs(empresa: string, limite: number = 500, offset: number = 0){
    let script = 'get_itacs_with_limit.php'
    const url = this.siteUrl + script
    //console.log(url);

    const data = new FormData()     
    data.append('LIMIT', limite.toString());  
    data.append('OFFSET', offset.toString()); 
    data.append('empresa', empresa);  

    const options  = {
      headers: new HttpHeaders({
        'Accept': '*/*'
      })
      , responseType: 'text' as 'text'
    };

    return this.http.post(url, data, options).pipe(map((res:any)=>{
      this.itacs = res;      
      //console.log("getItacs", empresa, offset, offset + limite);
      return this.itacs;
    }));
  }

  getItac(empresa: string, id_in_server: number){
    let script = 'get_itac_id.php'
    const url = this.siteUrl + script
    //console.log(url);

    const data = new FormData()     
    data.append('id', id_in_server.toString());  
    data.append('empresa', empresa);  

    const options  = {
      headers: new HttpHeaders({
        'Accept': '*/*'
      })
      , responseType: 'text' as 'text'
    };

    return this.http.post(url, data, options).pipe(map((res:any)=>{
      this.itac = res;
      //console.log("getItac", empresa, res);
      return this.itac;
    }));
  }

  getItacsWhere(empresa: string, field: string, value: string){
    let script = 'get_itacs_where_field_contains.php'
    const url = this.siteUrl + script
    //console.log(url);

    const data = new FormData() 
    data.append('empresa', empresa);      
    data.append('field', field);  
    data.append('value', value); 

    //console.log("getItacsWhere", empresa, field, value);

    const options  = {
      headers: new HttpHeaders({
        'Accept': '*/*'
      })
      , responseType: 'text' as 'text'
    };

    return this.http.post(url, data, options).pipe(map((res:any)=>{
      this.searchResult = res;      
      
      return this.searchResult;
    }));
  }
  getTareasWhere(empresa: string, field: string, value: string){
    let script = 'get_tareas_where_field_contains.php'
    const url = this.siteUrl + script
    //console.log(url);

    const data = new FormData() 
    data.append('empresa', empresa);      
    data.append('field', field);  
    data.append('value', value); 

    //console.log("getTareasWhere", empresa, field, value);

    const options  = {
      headers: new HttpHeaders({
        'Accept': '*/*'
      })
      , responseType: 'text' as 'text'
    };

    return this.http.post(url, data, options).pipe(map((res:any)=>{
      this.searchResult = res;    
      return this.searchResult;
    }));
  }
  getTareasCustomQuery(empresa: string, query: string, limite: number = 500, id_start: number = 0){
    let script = 'get_tareas_with_limit_custom_query.php'
    const url = this.siteUrl + script
    //console.log(url);

    const data = new FormData()     
    data.append('query', query);  
    data.append('LIMIT', limite.toString());
    data.append('id_start', id_start.toString()); 
    data.append('empresa', empresa);   

    //console.log("getTareasWhere", empresa, field, value);

    const options  = {
      headers: new HttpHeaders({
        'Accept': '*/*'
      })
      , responseType: 'text' as 'text'
    };

    return this.http.post(url, data, options).pipe(map((res:any)=>{
      this.tareas = res;  
      return this.tareas;
    }));
  }

  getTareas(empresa: string, limite: number = 500, offset: number = 0){
    let script = 'get_tareas_with_limit.php'
    const url = this.siteUrl + script
    //console.log(url);

    const data = new FormData()     
    data.append('LIMIT', limite.toString());  
    data.append('OFFSET', offset.toString()); 
    data.append('empresa', empresa);  

    const options  = {
      headers: new HttpHeaders({
        'Accept': '*/*'
      })
      , responseType: 'text' as 'text'
    };

    return this.http.post(url, data, options).pipe(map((res:any)=>{
      this.tareas = res;      
      //console.log("getTareas", empresa, offset, offset + limite);
      return this.tareas;
    }));
  }

  getTareasAmount(empresa: string){
    let script = 'get_tareas_amount.php'
    const url = this.siteUrl + script

    const data = new FormData()
    data.append('empresa', empresa);  

    const options  = {
      headers: new HttpHeaders({
        'Accept': '*/*'
      })
      , responseType: 'text' as 'text'
    };

    return this.http.post(url, data, options).pipe(map((res:string)=>{
      //console.log("getTareasAmount", res);
      let split = res.split(":");
      let count: number = 0;
      if(split.length > 1){
        count = Number(split[1].trim());
      }
      this.countTareas = count;
      return count;
    }));
  }
  getTareasAmountCustomQuery(empresa: string, query: string){
    let script = 'get_tareas_amount_custom_query.php'
    const url = this.siteUrl + script

    const data = new FormData()
    data.append('empresa', empresa);
    data.append('query', query);   

    const options  = {
      headers: new HttpHeaders({
        'Accept': '*/*'
      })
      , responseType: 'text' as 'text'
    };

    return this.http.post(url, data, options).pipe(map((res:any)=>{
     //  console.log("getTareasAmountCustomQuery", res);
      if(this._globalFunctions.isJson(res)){
        let jsonInfo = JSON.parse(res);
        this.countTareas = jsonInfo.count_tareas;
        ////  console.log(jsonInfo);
        ////  console.log('this.countTareas', this.countTareas);
        sessionStorage.setItem('jsonInfoCountTareas', JSON.stringify(jsonInfo));
        return this.countTareas;
      }else{
        return this.countTareas;
      }
    }));
  }

  getTarea(empresa: string, id_in_server: number){
    let script = 'get_tarea_id.php'
    const url = this.siteUrl + script
    //console.log(url);

    const data = new FormData()     
    data.append('id', id_in_server.toString());  
    data.append('empresa', empresa);  

    const options  = {
      headers: new HttpHeaders({
        'Accept': '*/*'
      })
      , responseType: 'text' as 'text'
    };

    return this.http.post(url, data, options).pipe(map((res:any)=>{
      this.tarea = res;
      // //console.log("getTareaId", empresa, res);
      return this.tarea;
    }));
  }

  getAdministradores(){
    let script = 'get_administradores.php'
    const url = this.siteUrl + script

    const data = new FormData()
    data.append('empresa', 'geconta');  

    const options  = {
      headers: new HttpHeaders({
        'Accept': '*/*'
      })
      , responseType: 'text' as 'text'
    };

    //console.log("POST", { url }, data);
    return this.http.post(url, data, options).pipe(map((res:any)=>{
      return res;
    }));
  }

  getEmpresas(){
    let script = 'get_empresas.php';

    //console.log(this.siteUrl + script);
    return this.http.get(this.siteUrl + script).pipe(map((res:any)=>{
      return res;
    }));
  }

  
}
