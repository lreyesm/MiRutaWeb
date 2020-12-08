import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tarea } from 'src/app/interfaces/tarea';
import { map } from 'rxjs/operators';
import { stringify } from 'querystring';
import { Itac } from '../interfaces/itac';
import { Cliente } from '../interfaces/cliente';

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

  public siteUrl = 'https://mywateroute.com/Mi_Ruta/';
  //siteUrl = 'http://localhost/';

  constructor(private http: HttpClient) { 
      console.log("constructor RequestService");
  }

  loginCliente(empresa: string, user_name: string, password: string){
    let script = 'login_cliente.php'
    const url = this.siteUrl + script
    console.log(url);

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
      console.log("loginCliente", empresa, res);
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
      console.log("getCountItacs", res);
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
    console.log(url);

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
      console.log("getItacs", empresa, offset, offset + limite);
      return this.itacs;
    }));
  }

  getItac(empresa: string, id_in_server: number){
    let script = 'get_itac_id.php'
    const url = this.siteUrl + script
    console.log(url);

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
      console.log("getItac", empresa, res);
      return this.itac;
    }));
  }

  getTareas(empresa: string, limite: number = 500, offset: number = 0){
    let script = 'get_tareas_with_limit.php'
    const url = this.siteUrl + script
    console.log(url);

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
      console.log("getTareas", empresa, offset, offset + limite);
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
      console.log("getTareasAmount", res);
      let split = res.split(":");
      let count: number = 0;
      if(split.length > 1){
        count = Number(split[1].trim());
      }
      this.countTareas = count;
      return count;
    }));
  }

  getTarea(empresa: string, id_in_server: number){
    let script = 'get_tarea_id.php'
    const url = this.siteUrl + script
    console.log(url);

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
      console.log("getTareaId", empresa, res);
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

    console.log("POST", { url }, data);
    return this.http.post(url, data, options).pipe(map((res:any)=>{
      return res;
    }));
  }

  getEmpresas(){
    let script = 'get_empresas.php';

    console.log(this.siteUrl + script);
    return this.http.get(this.siteUrl + script).pipe(map((res:any)=>{
      return res;
    }));
  }

  
}
