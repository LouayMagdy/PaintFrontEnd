import { Component} from '@angular/core';
import {ColorService} from "../color-service.service";


@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css']
})
export class ColorListComponent{

  constructor(private colorService : ColorService) {}
  show(){
    let color = (<HTMLInputElement>document.getElementById("colorList")).value;
    this.colorService.sendColor(color);
    console.log(color);
  }

}
