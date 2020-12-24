import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
// import * as admin from 'firebase-admin'; //administrador de firebase para borrar y crear cuentas

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isLoggedIn: boolean = false;


  constructor(public firebaseAuth: AngularFireAuth
              /*  ,private myadmin: admin.AppOptions */) { 

              
              }


  async signIn(email: string, password:string){
    //console.log("signIn", email, password);
    await this.firebaseAuth.signInWithEmailAndPassword(email.trim(), password)
    .then(res=>{
      //console.log("res", res);
      if(res.user){
        this.isLoggedIn = true;
        sessionStorage.setItem('user', JSON.stringify(res.user));
      }      
    })
  }
  async signUp(email: string, password:string){
    //console.log("signUp", email, password);
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
    .then(res=>{
      //console.log("res", res);
      this.isLoggedIn = true;
      sessionStorage.setItem('user', JSON.stringify(res.user));
    })
    .catch(error=>{
      //console.log("error",error);
    })
  }
  logOut(){
    this.firebaseAuth.signOut();
    // sessionStorage.removeItem('empresa');
    sessionStorage.removeItem('user');
  }
}
