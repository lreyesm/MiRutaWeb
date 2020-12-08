import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.component.html',
  styleUrls: ['./mapas.component.css']
})
export class MapasComponent implements OnInit {

  zoom = 16;
  title = 'Mapas de Mi Ruta';
  lat = 23.2730868;
  lng = -81.988851;

  constructor() { 

  }

  ngOnInit(): void {
  }

}
