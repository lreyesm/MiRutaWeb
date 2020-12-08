import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private auth: FirebaseService) { 
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    console.log(next);
    if(this.auth.isLoggedIn){
      console.log("Paso el guard");
      return true;
    }else{
      console.log("Bloqueado por el guard");
      return false;
    }
  }
}
