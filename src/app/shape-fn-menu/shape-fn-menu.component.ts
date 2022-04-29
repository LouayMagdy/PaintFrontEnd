import { Component, OnInit } from '@angular/core';
import {ShapeFnServiceService} from "../shape-fn-service.service";
import {ColorService} from "../color-service.service";

@Component({
  selector: 'app-shape-fn-menu',
  templateUrl: './shape-fn-menu.component.html',
  styleUrls: ['./shape-fn-menu.component.css']
})
export class ShapeFnMenuComponent implements OnInit {
  private shapeCoord : any;
  private backColour = "#000000";
  private shapeGot : any = {name: 'rightTri', color: "#000000", backColor: "#000000", v1:{x: 200, y: 200}, v2:{x: 200, y: 300}, v3:{x: 300, y: 300}};
  constructor(private serviceMenu : ShapeFnServiceService,
              private colorService : ColorService) {}

  ngOnInit(): void {
    this.colorService.color$.subscribe(
      message =>{
        this.backColour = message;
        console.log(this.backColour);
      }
    );
    this.serviceMenu.action$.subscribe(
      message =>{
        this.shapeCoord = message;
        console.log(this.shapeCoord);
      }
    );
  }

  menuOver(key: string){
    let menuElem = document.getElementById(key);
    menuElem!.style.color = 'black';
  }
  menuleft(key : string){
    let menuElem = document.getElementById(key);
    menuElem!.style.color = 'white';
  }

  do(key : string){
    let menu = document.getElementById("shapeFn");
    menu!.style.display= 'none';

    let canvas = <HTMLCanvasElement> document.getElementById("canvasElement");
    let context = canvas.getContext('2d');
    this.serviceMenu.send(key);

    if(key == 'fill'){
      ///////////////get shape from BACK-END////////////////
      ///////////////Delete shape from BACK-END//////////////

      context!.fillStyle = context!.strokeStyle
      this.shapeGot.backColor = context!.strokeStyle;
      context!.strokeStyle = this.shapeGot.color;
      if(this.shapeGot.name == 'rectangle'){
        context!.fillRect(this.shapeGot.corner.x,this.shapeGot.corner.y, this.shapeGot.w, this.shapeGot.l);
        context!.strokeRect(this.shapeGot.corner.x,this.shapeGot.corner.y, this.shapeGot.w, this.shapeGot.l);
      }
      else if(this.shapeGot.name == 'circle'){
        context!.beginPath();
        context!.arc(this.shapeGot.center.x, this.shapeGot.center.y, this.shapeGot.r, 0, 2 * Math.PI);
        context!.fill();
        context!.closePath();
        context!.stroke();
      }
      else if(this.shapeGot.name == 'ellipse'){
        context!.ellipse(this.shapeGot.center.x, this.shapeGot.center.y, this.shapeGot.r1
          , this.shapeGot.r2, 0, 0, 2 * Math.PI);
        context!.fill();
        context!.stroke();
      }
      else if(this.shapeGot.name == 'triangle' || this.shapeGot.name == 'rightTri'){
        context!.beginPath();
        context!.moveTo(this.shapeGot.v1.x, this.shapeGot.v1.y);
        context!.lineTo(this.shapeGot.v2.x, this.shapeGot.v2.y);
        context!.lineTo(this.shapeGot.v3.x, this.shapeGot.v3.y);
        context!.closePath();
        context!.fill();
        context!.stroke();
      }
    }
    else if(key == 'move'){
      /////////////////find shape in BACK-END///////////////
      ////////////////delete shape in BACK-END///////////////

    }
    else if(key == 'copy'){
      /////////////////find shape in BACK-END///////////////
    }
    else if(key == 'scale'){
      //////////delete shape in BACK-END////////////
    }
    else if(key == 'delete'){

      ///////////delete shape from BACK-END////////////////
    }
    if(key != 'close' && key != 'delete') this.serviceMenu.send(this.shapeGot);
  }


}
