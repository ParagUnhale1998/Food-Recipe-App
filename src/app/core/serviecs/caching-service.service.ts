import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CachingServiceService {

  private cache:{[key:string]:any} = {}
  
  constructor(){
    console.log(this.cache)
  }
  set(key:string,data:any):void {
    this.cache[key] = data;
  }

  get(key:string):any {
    console.log(this.cache)

    return this.cache[key];
  }

  clear(): void {
    this.cache = {};
  }


}
