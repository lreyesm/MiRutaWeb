import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor() { 
    // console.log("******************* InterceptorService constructor ***********************");
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // throw new Error('Method not implemented.');
    // console.log("******************* intercept ***********************");
    // console.log(req.url);
    const x_token = sessionStorage.getItem("x-token");

    if(x_token){
      const token_headers = new HttpHeaders({
        'x-token': x_token
      });
      const reqClone = req.clone({
        headers: token_headers
      });
      return next.handle(reqClone).pipe(
        catchError((error: HttpErrorResponse)=>{
          // console.log("**********************  error *************************");
          // console.log(error);
          return throwError(error.message);
        })
      );
    }
    return next.handle(req);
    
  }
}
