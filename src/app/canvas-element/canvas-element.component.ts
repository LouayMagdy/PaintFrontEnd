import { Component, OnInit } from '@angular/core';
import {ShapeListService} from "../shape-list.service";
import {ShapeFnServiceService} from "../shape-fn-service.service";
import {ColorService} from "../color-service.service";

@Component({
  selector: 'app-canvas-element',
  templateUrl: './canvas-element.component.html',
  styleUrls: ['./canvas-element.component.css']
})
export class CanvasElementComponent implements OnInit {
  option : string = 'cursor';
  shapeFn : string = "";
  color = '#000000';
  backColor = '#FFFFFF';
  drawnShapes : Array<any> = [];
  shapeGot: any;

  posX = -1;
  posY = -1;
  newPosX = -1;
  newPosY = -1;
  posX3 = -1;
  posY3 = -1;
  radius = 0;


  constructor(private service : ShapeListService, private fnMenuService : ShapeFnServiceService,
              private colorService : ColorService) { }

  ngOnInit(): void {
    this.service.shape$.subscribe(
      message =>{
        this.option = message;
        console.log(this.option);
      }
    );
    this.colorService.color$.subscribe(
      message =>{
        this.color = message;
        console.log(this.color);
      }
    );
    this.fnMenuService.action$.subscribe(
      message =>{
        if(typeof message == "string")
          this.shapeFn = message;
        else this.shapeGot = message;
        if(this.shapeFn == 'fill'){
          this.drawnShapes.push(this.shapeGot);
        }
      }
    );
  }

  setPos(eClick: any){
    const myCanvas = <HTMLCanvasElement> document.getElementById('canvasElement');
    let boundaries = myCanvas.getBoundingClientRect();
    myCanvas.getContext('2d');
    myCanvas.getContext('2d');
    if(this.posX == -1 && this.posY == -1){
      this.posX = eClick.screenX - boundaries.left - 1;
      this.posY = eClick.screenY - boundaries.top - 104;
      this.newPosX = this.posX;
      this.newPosY = this.posY;
      if(this.option == 'cursor'){
        let menu = document.getElementById('shapeFn');
        menu!.style.display = 'block';
        this.fnMenuService.send({x:this.posX, y: this.posY});
      }

      console.log("old"+ this.posX + ".." + this.posY);
      console.log("new" + this.newPosX +".."+this.newPosY);
    }
    else{
      if(this.option == 'rectangle'){
        this.drawnShapes.push({name: this.option, color: this.color, backColor: this.backColor, corner:
        {x: this.posX, y: this.posY}, w: this.newPosX - this.posX, l: this.newPosY - this.posY});
      }
      else if(this.option == 'circle'){
        this.drawnShapes.push({name: this.option, color: this.color, backColor: this.backColor, center:
            {x: this.posX, y: this.posY}, r: this.radius});
        this.radius = 0;
      }
      else if(this.option == 'ellipse'){
        this.drawnShapes.push({name: this.option, color: this.color, backColor: this.backColor, center:
            {x: this.posX, y: this.posY}, r1: this.posX3, r2: this.posY3});
        this.posX3 = -1;
        this.posY3 = -1;
      }
      else if(this.option == 'triangle' || this.option == 'rightTri'){
        this.drawnShapes.push({name: this.option, color: this.color, backColor: this.backColor, v1:
            {x:this.posX, y: this.posY}, v2: {x: this.newPosX, y: this.newPosY}, v3: {x: this.posX3,y: this.posY3}});
        this.posX3 = -1;
        this.posY3 = -1;
      }
      else if(this.option == 'line'){
        this.drawnShapes.push({name: this.option, color: this.color, backColor: this.backColor, start:
            {x:this.posX, y: this.posY}, end: {x: this.newPosX, y: this.newPosY}});
      }
      else if(this.option == 'cursor'){
        if(this.shapeFn == 'move' || this.shapeFn == 'copy' || this.shapeFn == 'scale' || this.shapeFn == 'fill'){
          console.log(this.shapeGot.name+ ".." + this.shapeGot.color+ ".." +this.shapeGot.backColor+ ".." +
            this.shapeGot.v1.x+ ".." + this.shapeGot.v1.y+ ".." +this.shapeGot.v2.x+ ".." + this.shapeGot.v2.y+ ".." +
            this.shapeGot.v3.x+ ".." +this.shapeGot.v3.y);

          if(this.shapeGot.name == 'rectangle'){
            this.drawnShapes.push({name: this.shapeGot.name, color: this.shapeGot.color, backColor: this.shapeGot.backColor, corner:
                {x: this.shapeGot.corner.x, y: this.shapeGot.corner.y}, w: this.shapeGot.w, l: this.shapeGot.l});
          }
          else if(this.shapeGot.name == 'circle'){
            this.drawnShapes.push({name: this.shapeGot.name, color: this.shapeGot.color, backColor: this.shapeGot.backColor, center:
                {x: this.shapeGot.center.x, y: this.shapeGot.center.y}, r: this.shapeGot.r});
            this.radius = 0;
          }
          else if(this.shapeGot.name == 'ellipse'){
            this.drawnShapes.push({name: this.shapeGot.name, color: this.shapeGot.color, backColor: this.shapeGot.backColor, center:
                {x: this.shapeGot.center.x, y: this.shapeGot.center.y}, r1: this.shapeGot.r1, r2: this.shapeGot.r2});
            this.posX3 = -1;
            this.posY3 = -1;
          }
          else if(this.shapeGot.name == 'triangle' || this.shapeGot.name == 'rightTri'){
            this.drawnShapes.push({name: this.shapeGot.name, color: this.shapeGot.color, backColor: this.shapeGot.backColor, v1:
                {x:this.shapeGot.v1.x, y: this.shapeGot.v1.y}, v2: {x: this.shapeGot.v2.x, y: this.shapeGot.v2.y},
              v3: {x: this.shapeGot.v3.x,y: this.shapeGot.v3.y}});
            this.posX3 = -1;
            this.posY3 = -1;
          }
          else if(this.shapeGot.name == 'line'){
            this.drawnShapes.push({name: this.shapeGot.name, color: this.shapeGot.color, backColor: this.shapeGot.backColor, start:
                {x:this.shapeGot.start.x, y: this.shapeGot.start.y}, end: {x: this.shapeGot.end.x, y: this.shapeGot.start.y}});
          }
          this.shapeFn = '';
          this.shapeGot='';
          this.posX3 = 0;
          this.posY3 = 0;
        }
      }
      this.posX = -1;
      this.posY = -1;
      this.newPosX = -1;
      this.newPosY = -1;
    }
  }

  draw(eDrag : any){
    if((this.posX == -1 && this.posY == -1 ) && this.option != "cursor") return;

    const myCanvas = <HTMLCanvasElement> document.getElementById('canvasElement');
    let boundaries = myCanvas.getBoundingClientRect();
    let context = myCanvas.getContext('2d');
    context!.strokeStyle = this.color;
    context!.clearRect(0,0, myCanvas.width, myCanvas.height);

    this.newPosX = eDrag.screenX - boundaries.left - 1;
    this.newPosY = eDrag.screenY - boundaries.top - 104;

    console.log("option: "+this.option);
    console.log("shapeFn: "+ this.shapeFn);
    if (this.option == 'cursor') console.log(this.shapeGot.name);

    if(this.option == 'cursor'){
      if(this.shapeFn == "move" || this.shapeFn == 'copy'){
        if(this.shapeGot.name == 'rectangle'){

          this.shapeGot.corner.x = this.newPosX;
          this.shapeGot.corner.y = this.newPosY;

          if(this.shapeGot.backColor == '#FFFFFF'){
            context!.strokeStyle = this.shapeGot.color;
            context!.strokeRect(this.shapeGot.corner.x, this.shapeGot.corner.y, this.shapeGot.w, this.shapeGot.l);
          }
          else{
            context!.fillStyle = this.shapeGot.backColor;
            context!.fillRect(this.shapeGot.corner.x, this.shapeGot.corner.y, this.shapeGot.w, this.shapeGot.l);
          }
        }
        else if(this.shapeGot.name == 'circle'){
          this.shapeGot.center.x = this.newPosX;
          this.shapeGot.center.y = this.newPosY;
          console.log(this.shapeGot.center.x + ".."+ this.shapeGot.center.y + ".."+ this.shapeGot.r + ".."+ this.shapeGot.backColor);
          context!.beginPath();
          context!.arc(this.shapeGot.center.x, this.shapeGot.center.y, this.shapeGot.r, 0, 2 * Math.PI);
          context!.closePath();
          if(this.shapeGot.backColor == "#FFFFFF"){
            context!.strokeStyle = this.shapeGot.color;
            context!.stroke();
          }
          else{
            context!.fillStyle = this.shapeGot.backColor;
            context!.fill();
          }
        }
        else if(this.shapeGot.name == 'ellipse'){
          this.shapeGot.center.x = this.newPosX;
          this.shapeGot.center.y = this.newPosY;
          context!.beginPath();
          context!.ellipse(this.shapeGot.center.x, this.shapeGot.center.y, this.shapeGot.r1
            , this.shapeGot.r2, 0, 0, 2 * Math.PI);
          context!.closePath();
          if(this.shapeGot.backColor == "#FFFFFF"){
            context!.strokeStyle = this.shapeGot.color;
            context!.stroke();
          }
          else{
            context!.fillStyle = this.shapeGot.backColor;
            context!.fill();
          }
        }
        else if(this.shapeGot.name == 'triangle' ||  this.shapeGot.name == 'rightTri'){
          let distX = this.newPosX - this.shapeGot.v1.x ;
          let distY = this.newPosY - this.shapeGot.v1.y;

          this.shapeGot.v2.x += distX;
          this.shapeGot.v2.y += distY;
          this.shapeGot.v3.x += distX;
          this.shapeGot.v3.y += distY;
          this.shapeGot.v1.x = this.newPosX;
          this.shapeGot.v1.y = this.newPosY;

          context!.beginPath();
          context!.moveTo(this.shapeGot.v1.x, this.shapeGot.v1.y);
          context!.lineTo(this.shapeGot.v2.x, this.shapeGot.v2.y);
          context!.lineTo(this.shapeGot.v3.x, this.shapeGot.v3.y);
          context!.closePath();
          if(this.shapeGot.backColor == "#FFFFFF"){
            context!.strokeStyle = this.shapeGot.color;
            context!.stroke();
          }
          else{
            context!.fillStyle = this.shapeGot.backColor;
            context!.fill();
          }

        }
        else if(this.shapeGot.name  == 'line'){
          let distX = this.newPosX - this.shapeGot.start.x ;
          let distY = this.newPosY - this.shapeGot.start.y;

          this.shapeGot.end.x += distX;
          this.shapeGot.end.y += distY;
          this.shapeGot.start.x = this.newPosX;
          this.shapeGot.start.y = this.newPosY;

          context!.beginPath();
          context!.moveTo(this.shapeGot.start.x, this.shapeGot.start.y);
          context!.lineTo(this.shapeGot.end.x, this.shapeGot.end.y);
          context!.closePath();
          context!.strokeStyle = this.shapeGot.color;
          context!.stroke();
        }
      }
      else if(this.shapeFn == 'delete' || this.shapeFn == 'close' || this.shapeFn =='fill'){
        this.posX = -1;
        this.posY = -1;
      }
    }

    if(this.option == "rectangle" || (this.option == 'cursor' && this.shapeFn == 'scale' && this.shapeGot.name == 'rectangle')){
      if(this.option == 'cursor'){
        this.posX = this.shapeGot.corner.x;
        this.posY = this.shapeGot.corner.y;
      }
      if(this.option == 'cursor' && this.shapeGot.backColor != '#FFFFFF'){
        context!.fillStyle = this.shapeGot.backColor;
        context!.fillRect(this.posX, this.posY, this.newPosX - this.posX, this.newPosY - this.posY);
      }
      else{
        if(this.option == 'cursor') context!.strokeStyle = this.shapeGot.color;
        context!.strokeRect(this.posX, this.posY, this.newPosX - this.posX, this.newPosY - this.posY);
      }
      if(this.option == 'cursor'){
        this.shapeGot.l = this.newPosY - this.posY;
        this.shapeGot.w = this.newPosX - this.posX;
      }
    }
    else if(this.option == "circle" || (this.option == 'cursor' && this.shapeFn == 'scale' && this.shapeGot.name == 'circle')){
      if(this.option == 'cursor'){
        this.posX = this.shapeGot.center.x;
        this.posY = this.shapeGot.center.y;
      }
      context!.closePath();
      context!.beginPath();
      let xDist = (this.newPosX - this.posX) * (this.newPosX - this.posX);
      let yDist = (this.newPosY - this.posY) * (this.newPosY - this.posY);
      this.radius = Math.ceil(Math.sqrt(xDist + yDist));

      let circle = new Path2D();
      circle.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
      if(this.option == 'cursor' && this.shapeGot.backColor != '#FFFFFF'){
        context!.fillStyle = this.shapeGot.backColor;
        context!.fill(circle);
      }
      else{
        if(this.option == 'cursor') context!.strokeStyle = this.shapeGot.color;
        context!.stroke(circle);
      }
      if(this.option == 'cursor'){
        this.shapeGot.r = this.radius;
      }
    }
    else if(this.option == "ellipse" || (this.option == 'cursor' && this.shapeFn == 'scale' && this.shapeGot.name == 'ellipse')){
      if(this.option == 'cursor'){
        this.posX = this.shapeGot.center.x;
        this.posY = this.shapeGot.center.y;
      }
      let xDist = Math.abs(this.newPosX - this.posX);
      let yDist = Math.abs(this.newPosY - this.posY);
      this.posX3 = xDist;
      this.posY3 = yDist;
      let myEllipse = new Path2D();
      myEllipse.ellipse(this.posX, this.posY, xDist, yDist, 0, 0, 2 * Math.PI);
      if(this.option == 'cursor' && this.shapeGot.backColor != '#FFFFFF'){
        context!.fillStyle = this.shapeGot.backColor;
        context!.fill(myEllipse);
      }
      else{
        if(this.option == 'cursor') context!.strokeStyle = this.shapeGot.color;
        context!.stroke(myEllipse);
      }
      if(this.option == 'cursor'){
        this.shapeGot.r1 = xDist;
        this.shapeGot.r2 = yDist;
      }
    }
    else if(this.option == 'triangle' || (this.option == 'cursor' && this.shapeFn == 'scale' && this.shapeGot.name == 'triangle')){
      if(this.option == 'cursor'){
        this.posX = this.shapeGot.v1.x;
        this.posY = this.shapeGot.v1.y;
      }
      if(this.newPosX >= this.posX && this.newPosY >= this.posY) {
        this.posX3 = this.newPosX + 2 * (this.posX - this.newPosX);
        this.posY3 = this.newPosY;
      }
      else if(this.newPosX >= this.posX && this.newPosY <= this.posY){
        this.posX3 = this.newPosX;
        this.posY3 = this.newPosY + 2 * (this.posY - this.newPosY);
      }
      else if(this.newPosX <= this.posX && this.newPosY >= this.posY){
        this.posX3 = this.newPosX;
        this.posY3 = this.newPosY - 2 * (this.newPosY - this.posY);
      }
      else{
        this.posX3 = this.newPosX - 2 * (this.newPosX - this.posX);
        this.posY3 = this.newPosY;
      }
    console.log("2ndV"+this.newPosX +".."+this.newPosY);
    console.log("3rdV"+this.posX3+".."+this.posY3);
    }
    else if(this.option == 'rightTri' || (this.option == 'cursor' && this.shapeFn == 'scale' && this.shapeGot.name == 'rightTri')){
      if(this.option == 'cursor'){
        this.posX = this.shapeGot.v1.x;
        this.posY = this.shapeGot.v1.y;
      }
      if(this.newPosX >= this.posX && this.newPosY >= this.posY) {
        this.posX3 = this.newPosX + (this.posX - this.newPosX);
        this.posY3 = this.newPosY;
      }
      else if(this.newPosX >= this.posX && this.newPosY <= this.posY){
        this.posX3 = this.newPosX;
        this.posY3 = this.newPosY + (this.posY - this.newPosY);
      }
      else if(this.newPosX <= this.posX && this.newPosY >= this.posY){
        this.posX3 = this.newPosX;
        this.posY3 = this.newPosY - (this.newPosY - this.posY);
      }
      else{
        this.posX3 = this.newPosX - (this.newPosX - this.posX);
        this.posY3 = this.newPosY;
      }

    }
    else if(this.option == 'line' || (this.option == 'cursor' && this.shapeFn == 'scale' && this.shapeGot.name == 'line')) {
      if(this.option == 'cursor'){
        console.log("shape: "+ this.shapeGot.start.x +".."+ this.shapeGot.start.y+'..'+ this.shapeGot.end.x +".."+ this.shapeGot.end.y);
        this.posX = this.shapeGot.start.x;
        this.posY = this.shapeGot.start.y;
      }
      context!.beginPath();
      context!.moveTo(this.posX, this.posY);
      context!.lineTo(this.newPosX, this.newPosY);
      context!.closePath();
      context!.stroke();
      if(this.option == 'cursor'){
        this.shapeGot.end.x = this.newPosX;
        this.shapeGot.end.y = this.newPosY;
      }
    }

    if(this.option == 'triangle' || this.option == 'rightTri' ||
      (this.option == 'cursor' && this.shapeFn == 'scale' && (this.shapeGot.name == 'triangle' || this.shapeGot.name == 'rightTri'))){
      if(this.option == 'cursor'){
        this.shapeGot.v2.x = this.newPosX;
        this.shapeGot.v2.y = this.newPosY;
        this.shapeGot.v3.x = this.posX3;
        this.shapeGot.v3.y = this.posY3;
      }
      context!.beginPath();
      context!.moveTo(this.posX, this.posY);
      context!.lineTo(this.newPosX, this.newPosY);
      context!.lineTo(this.posX3, this.posY3);
      context!.closePath();
      if(this.option == 'cursor' && this.shapeGot.backColor != '#FFFFFF'){
        context!.fillStyle = this.shapeGot.backColor;
        context!.fill();
      }
      else{
        if(this.option == 'cursor') context!.strokeStyle = this.shapeGot.color;
        context!.stroke();
      }
    }

    //////
    ///////send shape////////////

    //////////////get shapes////////////

    /////////////draw them//////////////
    for(let i = 0; i < this.drawnShapes.length; i++){

      context!.strokeStyle = this.drawnShapes[i].color;
      if(this.drawnShapes[i].name == 'rectangle'){
        if(this.drawnShapes[i].backColor != '#FFFFFF'){
          context!.fillStyle = this.drawnShapes[i].backColor;
          context!.fillRect(this.drawnShapes[i].corner.x, this.drawnShapes[i].corner.y, this.drawnShapes[i].w, this.drawnShapes[i].l);
        }
        else {
          context!.strokeStyle = this.drawnShapes[i].color;
          context!.strokeRect(this.drawnShapes[i].corner.x, this.drawnShapes[i].corner.y, this.drawnShapes[i].w, this.drawnShapes[i].l);
        }

      }
      else if(this.drawnShapes[i].name == 'circle') {
        context!.beginPath();
        context!.arc(this.drawnShapes[i].center.x, this.drawnShapes[i].center.y, this.drawnShapes[i].r, 0, 2 * Math.PI);
        context!.closePath();
        if(this.drawnShapes[i].backColor != '#FFFFFF'){
          context!.fillStyle = this.drawnShapes[i].backColor;
          context!.fill();
        }
        else {
          context!.strokeStyle = this.drawnShapes[i].color;
          context!.stroke();
        }
      }
      else if(this.drawnShapes[i].name == 'line'){
        context!.beginPath();
        context!.moveTo(this.drawnShapes[i].start.x, this.drawnShapes[i].start.y);
        context!.lineTo(this.drawnShapes[i].end.x, this.drawnShapes[i].end.y);
        context!.closePath();
        context!.strokeStyle = this.drawnShapes[i].color;
        context!.stroke();
      }
      else if(this.drawnShapes[i].name == 'ellipse'){
        context!.ellipse(this.drawnShapes[i].center.x, this.drawnShapes[i].center.y, this.drawnShapes[i].r1
          , this.drawnShapes[i].r2, 0, 0, 2 * Math.PI);
        if(this.drawnShapes[i].backColor != '#FFFFFF'){
          context!.fillStyle = this.drawnShapes[i].backColor;
          context!.fill();
        }
        else {
          context!.strokeStyle = this.drawnShapes[i].color;
          context!.stroke();
        }
      }
      else if(this.drawnShapes[i].name == 'triangle' || this.drawnShapes[i].name == 'rightTri'){
        context!.beginPath();
        context!.moveTo(this.drawnShapes[i].v1.x, this.drawnShapes[i].v1.y);
        context!.lineTo(this.drawnShapes[i].v2.x, this.drawnShapes[i].v2.y);
        context!.lineTo(this.drawnShapes[i].v3.x, this.drawnShapes[i].v3.y);
        context!.closePath();
        if(this.drawnShapes[i].backColor != '#FFFFFF'){
          context!.fillStyle = this.drawnShapes[i].backColor;
          context!.fill();
        }
        else {
          context!.strokeStyle = this.drawnShapes[i].color;
          context!.stroke();
        }
      }
    }
  }

  setCursor(){
    let myCanvas = <HTMLCanvasElement> document.getElementById("canvasElement");
    if(this.option == 'cursor' ) {
      myCanvas.style.cursor = 'pointer';
      return;
    }
    myCanvas!.style.cursor = 'crosshair';
  }
}
