import { Component, OnDestroy } from '@angular/core';
import { Empresa } from './interfaces/empresa';
import { FirebaseService } from './services/firebase.service';
import { RequestService } from './services/request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  title = 'MiRuta';
  isLogged: boolean = false;
  searching_empresas: boolean = false;

  empresas: Empresa[] = [];
  selectedEmpresa: string = null;
  selectedNameEmpresa: string = null;

  constructor(public _firebaseService: FirebaseService,
              private _requestService: RequestService) {
                this.searching_empresas = true;
                this._requestService.getEmpresas().subscribe(res=>{
                  console.log("AppComponent._requestService.getEmpresas", res);
                  this.empresas = res;
                  
                  this.selectEmpresa(this.empresas[0].empresa, this.empresas[0].nombre_empresa)
                  this.searching_empresas = false;             
                });   
  }

  ngOnInit(): void {
    if(localStorage.getItem('user')!==null){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
    console.log("ngOnInit", this.isLogged);
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log("Destroying web page MiRuta");
    this.handleLogOut();
  }

  async onSignUp(email: string, password: string){
    await this._firebaseService.signUp(email, password)
    if(this._firebaseService.isLoggedIn){
      this.isLogged = true;
    }
    console.log("onSignUp", this.isLogged);
  }
  
  async onSignIn(email: string, password: string){
    await this._firebaseService.signIn(email, password)
    if(this._firebaseService.isLoggedIn){
      this.isLogged = true;
    }
    console.log("onSignIn", this.isLogged); 
    console.log("Empresa", this.selectedEmpresa);      
  }

  login(email: string, password: string){
    this._requestService.loginCliente(this.selectedEmpresa, email, password).subscribe(res=>{
      if(res){
        console.log("login", "Iniciando en Firebase");
        this.onSignIn(email, password);
      }else{
        console.log("login", "fallido");
      }    
   })  
  }

  handleLogOut(){
    this.isLogged = false;
    console.log("handleLogOut", this.isLogged);
    this._firebaseService.logOut();
  }

  selectEmpresa(empresaSelected: string, nombre_empresa: string){
    this.selectedEmpresa = empresaSelected;
    this.selectedNameEmpresa = nombre_empresa;
    console.log("selectedEmpresa", this.selectedEmpresa);
    localStorage.setItem('empresa', this.selectedEmpresa);
  }
}
