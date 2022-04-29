import { Component, OnInit } from '@angular/core';
import {ShapeListService} from "../shape-list.service";

@Component({
  selector: 'app-shape-list',
  templateUrl: './shape-list.component.html',
  styleUrls: ['./shape-list.component.css']
})
export class ShapeListComponent implements OnInit {

  prevKey='cursor';
  pervColor: string ='';

  getShape(){
    console.log(this.prevKey);
  }
  selectButton(key : string){
    let prevButton = document.getElementById(this.prevKey);
    prevButton!.style.background = 'white';
    let currentButton = document.getElementById(key);
    currentButton!.style.background='lightgrey';
    this.pervColor = 'lightgrey';
    this.prevKey=key;
    this.service.sendToCanvas(this.prevKey);
    this.getShape();
  }
  overButton(key : string){
    let button = document.getElementById(key);
    this.pervColor = button!.style.background;
    button!.style.background = 'grey';
  }
  leaveButton(key : string){
    let button = document.getElementById(key);
    button!.style.background = this.pervColor;
  }

  constructor(private service : ShapeListService) {}

  ngOnInit(): void {}


}
