import { Component, OnDestroy } from '@angular/core';
import { Empresa } from './interfaces/empresa';
import { FirebaseService } from './services/firebase.service';
import { RequestService } from './services/request.service';
import { NgForm } from  '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  title = 'MiRuta';

  loading_signin: boolean = false;
  isLogged: boolean = false;
  searching_empresas: boolean = false;

  showNotSelectedEmpresa: boolean = false;
  showWrongEmailPassword: boolean = false;
  showError: boolean = false;
  errorMessage:string = "Error";

  empresas: Empresa[] = [];
  selectedEmpresa: string = null;
  selectedNameEmpresa: string = "Seleccione Empresa";

  constructor(public _firebaseService: FirebaseService,
              private _requestService: RequestService) {
                this.searching_empresas = true;
                this._requestService.getEmpresas().subscribe(res=>{
                  // console.log("_requestService.getEmpresas", res);
                  this.empresas = res;
                  
                  // this.selectEmpresa(this.empresas[0].empresa, this.empresas[0].nombre_empresa)
                  this.searching_empresas = false;             
                });   
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('cliente')!==null){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
    //console.log("ngOnInit", this.isLogged);
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    //console.log("Destroying web page MiRuta");
    this.handleLogOut();
  }

  async onSignUp(email: string, password: string){
    //console.log("Ejecutando","onSignUp--------------");
    await this._firebaseService.signUp(email, password)
    if(this._firebaseService.isLoggedIn){
      this.isLogged = true;
    }
  }
  
  async onSignIn(email: string, password: string){
    //console.log("Ejecutando","onSignIn------------------");
    await this._firebaseService.signIn(email, password).catch((error:any)=>{
      let errorCode:string = error.code;
      this.errorMessage = error.message;
      //console.log("errorCode",errorCode);
      //console.log("errorMessage",this.errorMessage);
      if(errorCode.includes("user") && errorCode.includes("not") && errorCode.includes("found")){
        //console.log("user not found", "Signing Up--------------------------------------"); 
        this.onSignUp(email, password).then(res=>{
          this.login(email, password);
        });
      }
      else{
        this.showError = true;
      }
    })
    this.loading_signin = false;
    if(this._firebaseService.isLoggedIn){
      this.isLogged = true;
    }    
    //console.log("Empresa", this.selectedEmpresa);      
  }

  login(email: string, password: string){
    if(!this.loading_signin){
      this.loading_signin = true;
      this.showError = false;
      if(this.selectedEmpresa){
        this._requestService.loginCliente(this.selectedEmpresa,
           email, password).subscribe((cliente: any)=>{
          if(cliente){
            sessionStorage.setItem('cliente', JSON.stringify(cliente));
            // console.log("login", "Iniciando en Firebase");
            // this.onSignIn(email, password); //sin firebase con firebase
            // console.log("login", "correcto");
            this.isLogged = true; //sin firebase
            this.loading_signin = false;
            this.showWrongEmailPassword = false;
          }else{
            // console.log("login", "fallido");
            this.showWrongEmailPassword = true;
            this.loading_signin = false;
          }    
        })  
      }else{
        this.showNotSelectedEmpresa = true;
        this.loading_signin = false;      
      }
    }
  }
  guardar(forma: NgForm){
    // //console.log("guardando forma", "-------------------------");
    // //console.log(forma);
    // //console.log(forma.value);
  }

  handleLogOut(){
    this.isLogged = false;
    //console.log("handleLogOut", this.isLogged);
    this._firebaseService.logOut();
  }

  selectEmpresa(empresaSelected: string, nombre_empresa: string){
    this.showNotSelectedEmpresa = false;
    this.selectedEmpresa = empresaSelected;
    this.selectedNameEmpresa = nombre_empresa;
    //console.log("selectedEmpresa", this.selectedEmpresa);
    sessionStorage.setItem('empresa', this.selectedEmpresa);
  }
}
