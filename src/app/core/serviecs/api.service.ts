import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpclient:HttpClient) { }

  getRandomMeal(){
   return this.httpclient.get('https://www.themealdb.com/api/json/v1/1/search.php?s=')
  }
  getCategoryMeal(){
    return this.httpclient.get('https://www.themealdb.com/api/json/v1/1/categories.php/')
   }
   getIngredientMeal(){
    return this.httpclient.get('https://www.themealdb.com/api/json/v1/1/filter.php?i=')
   }

   getSingleCategoryMeal(name:any){
    return this.httpclient.get('https://www.themealdb.com/api/json/v1/1/filter.php?c='+ name)
   }
   getSearchMeal(searchName:any){
    return this.httpclient.get('https://www.themealdb.com/api/json/v1/1/search.php?s='+searchName)
   }
   getIngredientAll(){
    return this.httpclient.get('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
   }
   

}
