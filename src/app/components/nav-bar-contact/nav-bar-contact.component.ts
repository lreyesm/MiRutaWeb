import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar-contact',
  templateUrl: './nav-bar-contact.component.html',
  styleUrls: ['./nav-bar-contact.component.css']
})
export class NavBarContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  goToLink(){
    window.open("http://www.mraguas.com", "_blank");
  }
}
