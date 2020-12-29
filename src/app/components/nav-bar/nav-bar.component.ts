import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Cliente } from 'src/app/interfaces/cliente';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Output() isLogOut = new EventEmitter<void>();
  cliente: Cliente = null;
  dirFolder: string = null;
  urlFolder: string = null;
  empresa: string = null;
  isLogIn: boolean = false;
  
  constructor(public _firebaseService: FirebaseService,
              public _requestService: RequestService) {    
    this.cliente = JSON.parse(sessionStorage.getItem('cliente'));
    this.empresa = sessionStorage.getItem('empresa');    
    if(this.cliente){
      this.dirFolder = "Empresas/"+this.empresa+"/fotos_clientes/";
      this.urlFolder = this._requestService.siteUrl + this.dirFolder;
      console.log("this.urlFolder", this.urlFolder);
      console.log("this.cliente", this.cliente);
      console.log("this.cliente.foto", this.cliente.foto);
    } 
  }

  ngOnInit(): void {
  }

  logOut(){
    // this._firebaseService.logOut(); 
    this.isLogOut.emit();
    this.isLogIn = false;
  }
}
