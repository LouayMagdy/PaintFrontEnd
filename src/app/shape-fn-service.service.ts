import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class ShapeFnServiceService {
  private subj = new Subject<any>();
  action$ = this.subj.asObservable();
  send(action : any){
    this.subj.next(action);
  }
  constructor() { }
}
