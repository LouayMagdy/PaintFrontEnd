import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShapeListService {
  private subject : Subject<string> = new Subject<string>();
  shape$ = this.subject.asObservable();

  sendToCanvas(shape : string){
    this.subject.next(shape);
  }
  constructor() { }
}
