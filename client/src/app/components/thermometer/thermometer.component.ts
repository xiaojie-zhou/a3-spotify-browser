import {Component, Input, OnInit} from '@angular/core';
import {TrackFeature} from "../../data/track-feature";

@Component({
  selector: 'app-thermometer',
  templateUrl: './thermometer.component.html',
  styleUrls: ['./thermometer.component.css']
})
export class ThermometerComponent implements OnInit {
  //define Input fields and bind them to the template.
  @Input() feature: TrackFeature;
  name: string;
  percentage: string;
  color: string;

  constructor() {
  }

  ngOnInit() {
    this.name = this.feature.name;
    this.percentage = this.feature.percentageString;
    this.color = this.feature.color;
  }

}
