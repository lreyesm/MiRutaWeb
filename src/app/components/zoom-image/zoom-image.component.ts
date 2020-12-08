import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-zoom-image',
  templateUrl: './zoom-image.component.html',
  styleUrls: ['./zoom-image.component.css']
})
export class ZoomImageComponent implements OnInit {

  url: string = "";

  constructor(private activeRoute: ActivatedRoute) { 
    this.activeRoute.params.subscribe((params:any)=>{
                  console.log("params",params);
                  this.url = params['id'];
                  console.log("id",this.url);
                  
                  
                })
  }

  ngOnInit(): void {
  }

}
