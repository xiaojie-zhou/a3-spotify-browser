import { Component, OnInit, Input } from '@angular/core';
import { ResourceData } from '../../data/resource-data';

@Component({
  selector: 'app-carousel-card',
  templateUrl: './carousel-card.component.html',
  styleUrls: ['./carousel-card.component.css']
})
export class CarouselCardComponent implements OnInit {
  @Input() resource:ResourceData;
  id:string;
  category:string;
  name:string;
  image:string;
  link:string;

  constructor() { }

  ngOnInit() {
    this.id = this.resource.id;
    this.category = this.resource.category;
    this.link = "/"+this.category+"/"+this.id;
    this.image = this.resource.imageURL;
    this.name = this.resource.name;
  }

}
