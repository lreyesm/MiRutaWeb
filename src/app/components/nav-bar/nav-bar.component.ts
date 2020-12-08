import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Output() isLogOut = new EventEmitter<void>();
  
  constructor(public _firebaseService: FirebaseService) {

  }

  ngOnInit(): void {
  }

  logOut(){
    this._firebaseService.logOut();
    this.isLogOut.emit();
  }
}
