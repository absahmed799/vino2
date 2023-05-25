import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token:BehaviorSubject<string>;
  token$:Observable<string>;

  cellier:BehaviorSubject<number>;
  cellier$:Observable<number>;
  constructor() { 
    this.token= new BehaviorSubject<string>("");
    this.token$=this.token.asObservable();

    this.cellier = new BehaviorSubject<number>(0);
    this.cellier$ =  this.cellier.asObservable();
  }
  setToken(chaine:string):void{
    console.log('set token');
    
    this.token.next(chaine);
  }
  getToken():Observable<string>{
    console.log('get token');
    console.log(this.token);
    
    return this.token["_value"];
  }
  setCellier(id:number):void{
    console.log('set id Cellier');
    
    this.cellier.next(id);
  }
  getCellier():Observable<number>{
    console.log('get id Cellier');
    console.log(this.token);
    
    return this.cellier["_value"];
  }
}
