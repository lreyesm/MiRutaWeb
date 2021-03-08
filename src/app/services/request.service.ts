import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tarea } from 'src/app/interfaces/tarea';
import { catchError, map } from 'rxjs/operators';
import { stringify } from 'querystring';
import { Itac } from '../interfaces/itac';
import { Cliente } from '../interfaces/cliente';
import { Observable, of, throwError } from 'rxjs';
import { GlobalfunctionsService } from './globalfunctions.service';
import { Answer } from '../interfaces/answer';

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
  x_token: string;

  // public siteUrl = 'https://mywateroute.com/Mi_Ruta/';
  siteUrl = 'http://localhost:3000/api/v1/';

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
    let script = 'clientes/login';
    const url = this.siteUrl + script;
    //console.log(url);

    const data = new FormData();    
    //***************** PHP ***************************/
    // data.append('user_name', user_name); 
    // data.append('password', password);  
    //***************** PHP ***************************/

    //*****************NodeJS***************************/
    data.append('usuario', user_name);  //
    data.append('clave', password);  
    //*****************NodeJS***************************/

    data.append('empresa', empresa);  

    const options  = {
      headers: new HttpHeaders({
        'Accept': '*/*'
      })
      //***************** PHP ***************************/
      // , responseType: 'text' as 'text'
      //***************** PHP ***************************/
    };

    return this.http.post(url, data, options).pipe(
      map((res:Answer)=>{
        //console.log("loginCliente", empresa, res);
        //***************** PHP ***************************/
        // if(res.includes("not success")){
        //   return null;
        // }else{
        //   this.cliente = JSON.parse(res)[0];
        //   return this.cliente;
        // }    
        //***************** PHP ***************************/      

        //*****************NodeJS***************************/     
        if(res.success){
          this.cliente = res.data.cliente;
          this.x_token = res.data.token;
          sessionStorage.setItem('x-token', this.x_token);
          // sessionStorage.setItem('cliente', JSON.stringify(this.cliente)); //I'm setting this on 
          // console.log(res);
          // console.log(this.x_token);
          // console.log(this.cliente);
          return this.cliente;
        }else{
          // console.log(res);
          return null;
        }     
        //*****************NodeJS***************************/
      },
      catchError(error =>{
        return null;
      })
    ));
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
    //***************** PHP ***************************/
    // let script = 'get_itac_id.php'
    //***************** PHP ***************************/

    
    //*****************NodeJS***************************/
    let script = 'itacs/id/' + String(id_in_server);
    //*****************NodeJS***************************/

    const url = this.siteUrl + script;
    //console.log(url);

    const data = new FormData()    
    //***************** PHP ***************************/ 
    // data.append('id', id_in_server.toString());  
    // data.append('empresa', empresa); 
    //***************** PHP ***************************/ 

    
    //*****************NodeJS***************************/
    data.append('empresa', empresa); 
    //*****************NodeJS***************************/    

    const options  = {
      headers: new HttpHeaders({
        'Accept': '*/*'
      })
      //***************** PHP ***************************/
      // , responseType: 'text' as 'text'
      //***************** PHP ***************************/
    };

    return this.http.post(url, data, options).pipe(map((res:any)=>{      
      //***************** PHP ***************************/
      // this.itac = res;
      //***************** PHP ***************************/

      //*****************NodeJS***************************/
      if(res.data){
        // console.log(res['data']);
        this.itac = res.data[0];
        // console.log(this.itac);
      }
      //*****************NodeJS***************************/
      // console.log("getItac", empresa, res);
      return this.itac;
    }));
  }

  getItacsWhere(empresa: string, field: string, value: string){
    //***************** PHP ***************************/
    // let script = 'get_itacs_where_field_contains.php';
    //***************** PHP ***************************/

    
    //*****************NodeJS***************************/
    let script = 'itacs/custom_query'
    //*****************NodeJS***************************/
    
    const url = this.siteUrl + script;
    //console.log(url);

    const data = new FormData();
    //***************** PHP ***************************/
    // data.append('empresa', empresa);      
    // data.append('field', field);  
    // data.append('value', value); 
    //***************** PHP ***************************/

    
    //*****************NodeJS***************************/ 
    const query = field + " LIKE '" + value + "'"; 
    data.append('empresa', empresa);  
    data.append('where', query); 
    //*****************NodeJS***************************/
    // console.log("getItacsWhere", empresa, query);

    const options  = {
      headers: new HttpHeaders({
        'Accept': '*/*'
      })
      //***************** PHP ***************************/
      // , responseType: 'text' as 'text'
      //***************** PHP ***************************/
    };

    return this.http.post(url, data, options).pipe(map((res:any)=>{
      this.searchResult = res.data;      
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
    //***************** PHP ***************************/
    // let script = 'get_tareas_amount_custom_query.php';
    //***************** PHP ***************************/

    //*****************NodeJS***************************/
    let script = 'tareas/count';
    //*****************NodeJS***************************/

    const url = this.siteUrl + script

    const data = new FormData()
    //***************** PHP ***************************/
    // data.append('empresa', empresa);
    // data.append('query', query);   
    //***************** PHP ***************************/

    //*****************NodeJS***************************/
    data.append('empresa', empresa);
    data.append('where', query);  
    //*****************NodeJS***************************/

    console.log("****************** query ***************** ", query);
    const options  = {
      headers: new HttpHeaders({
        'Accept': '*/*'
      })
      //***************** PHP ***************************/
      // , responseType: 'text' as 'text'
      //***************** PHP ***************************/
    };

    return this.http.post(url, data, options).pipe(
      map((res:any)=>{
     //  console.log("getTareasAmountCustomQuery", res);
     //***************** PHP ***************************/
      // if(this._globalFunctions.isJson(res)){
      //   let jsonInfo = JSON.parse(res);
      //   this.countTareas = jsonInfo.count_tareas;
      //   ////  console.log(jsonInfo);
      //   ////  console.log('this.countTareas', this.countTareas);
      //   sessionStorage.setItem('jsonInfoCountTareas', JSON.stringify(jsonInfo));
      //   return this.countTareas;
      // }else{
      //   return this.countTareas;
      // }
      //***************** PHP ***************************/
     
      //*****************NodeJS***************************/
        if(res.success){
          // console.log(res);
          return res.count;
        }
        return [];
        //*****************NodeJS***************************/
      },
      catchError(error =>{
        return [];
      })
    ));
  }
  getTareasCustomQuery(empresa: string, query: string, 
    limite: number = 500, /* PHP id_start: number = 0 */ page: number){
    //***************** PHP ***************************/
    // let script = 'get_tareas_with_limit_custom_query.php'
    //***************** PHP ***************************/

    //*****************NodeJS***************************/
    let script = 'tareas/page/' + String(page);
    //*****************NodeJS***************************/

    const url = this.siteUrl + script
    console.log(url);

    const data = new FormData();

    //***************** PHP ***************************/
    // data.append('query', query);  
    // data.append('LIMIT', limite.toString());
    // data.append('id_start', id_start.toString());
    // data.append('empresa', empresa); 
    //***************** PHP ***************************/  

    //*****************NodeJS***************************/
    data.append('where', query);  
    data.append('limit', limite.toString());
    data.append('empresa', empresa); 
    //*****************NodeJS***************************/

    //console.log("getTareasWhere", empresa, field, value);

    const options  = {
      headers: new HttpHeaders({
        'Accept': '*/*'
      })
      //***************** PHP ***************************/  
      // , responseType: 'text' as 'text'
      //***************** PHP ***************************/  
    };

    //***************** PHP ***************************/ 
    // return this.http.post(url, data, options).pipe(
    //   map((res:any)=>{ 
    //     // this.tareas = res;  
    //     // return this.tareas;
    //   },
    //   catchError(error =>{
    //     return [];
    //   })
    // ));
    //***************** PHP ***************************/ 
    
    return this.http.post(url, data, options).pipe(
      map((res:any)=>{
        //***************** PHP ***************************/  
        // this.tareas = res;  
        // return this.tareas;
        //***************** PHP ***************************/  
        
        //*****************NodeJS***************************/
        this.tareas = res.data;  
        return this.tareas;
        //*****************NodeJS***************************/
      },
      catchError(error =>{
        return [];
      })
    ));
  }
  getTarea(empresa: string, id_in_server: number){
    //***************** PHP ***************************/
    // let script = 'get_tarea_id.php'
    //***************** PHP ***************************/
    
    //*****************NodeJS***************************/
    let script = 'tareas/id/' + String(id_in_server);
    //*****************NodeJS***************************/

    const url = this.siteUrl + script;
    //console.log(url);

    const data = new FormData();

    //***************** PHP ***************************/
    // data.append('id', id_in_server.toString());  
    // data.append('empresa', empresa);  
    //***************** PHP ***************************/

    //*****************NodeJS***************************/
    data.append('empresa', empresa); 
    //*****************NodeJS***************************/    

    const options  = {
      headers: new HttpHeaders({
        'Accept': '*/*'
      })
      //***************** PHP ***************************/
      // , responseType: 'text' as 'text'
      //***************** PHP ***************************/
    };

    return this.http.post(url, data, options).pipe(map((res:any)=>{
      //***************** PHP ***************************/
      // this.tarea = res;
      //***************** PHP ***************************/

      //*****************NodeJS***************************/
      if(res.data){
        // console.log(res['data']);
        this.tarea = res.data[0];
        // console.log(this.tarea);
      }
      //*****************NodeJS***************************/
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
      //***************** PHP ***************************/
      // , responseType: 'text' as 'text'
      //***************** PHP ***************************/
    };

    //console.log("POST", { url }, data);
    return this.http.post(url, data, options).pipe(map((res:any)=>{
      return res;
    }));
  }

  getEmpresas(){
    let script = 'empresas'; //route of request
    //console.log(this.siteUrl + script);
    return this.http.get(this.siteUrl + script).pipe(
      map((res:Answer)=>{
        //***************** PHP ***************************/
        //return res;
        //***************** PHP ***************************/

        //*****************NodeJS***************************/
        if(res.success){
          // console.log(res);
          return res.data;
        }
        return [];
        //*****************NodeJS***************************/
      },
      catchError(error =>{
        return [];
      })
    ));
  }

  
}
