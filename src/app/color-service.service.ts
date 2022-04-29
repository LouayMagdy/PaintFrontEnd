import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private colorSource = new Subject<string>();
  color$ = this.colorSource.asObservable();
  sendColor(col: string){
    this.colorSource.next(col);
  }
}
