import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CachingServiceService } from './caching-service.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpclient:HttpClient ,private cachingService:CachingServiceService) { }

  getRandomMeal(){
    const cacheKey = 'RandomMeals'
    const cachedData = this.cachingService.get(cacheKey);
    if (cachedData) {
      console.log('catched random Meals')

      return new Observable((observer) => {
        observer.next(cachedData);
        observer.complete();
      });
    } else{
      console.log('call api random Meals')

      return this.httpclient.get('https://www.themealdb.com/api/json/v1/1/search.php?s=').pipe(
        tap((data) => this.cachingService.set(cacheKey, data))
      )
    }
  }
  getCategoryMeal(): Observable<any>{
   const cacheKey = 'categoryMeal'
   const cachedData = this.cachingService.get(cacheKey);
   if (cachedData) {
    console.log('catched categoryMeal')
     return new Observable((observer) => {
       observer.next(cachedData);
       observer.complete();
     });
   } else{
    console.log('call api categoryMeal')
    return this.httpclient.get('https://www.themealdb.com/api/json/v1/1/categories.php/').pipe(
      tap((data) => this.cachingService.set(cacheKey, data))
    )
   }
   }

   getIngredientMeal(){
    const cacheKey = 'ingredientMeal'
   const cachedData = this.cachingService.get(cacheKey);
   if (cachedData) {
    console.log('catched ingredientMeal')
     return new Observable((observer) => {
       observer.next(cachedData);
       observer.complete();
     });
   }else{
    console.log('call api ingredientMeal')
     return this.httpclient.get('https://www.themealdb.com/api/json/v1/1/filter.php?i=').pipe(
      tap((data) => {
        this.cachingService.set(cacheKey,data)
      })
     )
   }
   }

   getSingleCategoryMeal(name:any){
    const cacheKey = name
   const cachedData = this.cachingService.get(cacheKey);
   if (cachedData) {
    console.log('catched SingleCategoryMeal'+ name)
     return new Observable((observer) => {
       observer.next(cachedData);
       observer.complete();
     });
   }else{
     return this.httpclient.get('https://www.themealdb.com/api/json/v1/1/filter.php?c='+ name).pipe(
      tap((data) => {
        this.cachingService.set(cacheKey,data)
      })
     )
   }
   }
   getSearchMeal(searchName:any){
    return this.httpclient.get('https://www.themealdb.com/api/json/v1/1/search.php?s='+searchName)
   }
   getIngredientAll(){
    const cacheKey = 'IngredientAll'
    const cachedData = this.cachingService.get(cacheKey);
    if (cachedData) {
     console.log('catched IngredientAll')
      return new Observable((observer) => {
        observer.next(cachedData);
        observer.complete();
      });
    }
    else{
      return this.httpclient.get('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
      .pipe(tap(data => this.cachingService.set(cacheKey,data)))
    }
   }
   getMealByLocation(location:any){
    const cacheKey = 'loactions Meal'
    const cachedData = this.cachingService.get(cacheKey);
    if (cachedData) {
     console.log('catched loactions Meal')
      return new Observable((observer) => {
        observer.next(cachedData);
        observer.complete();
      });
    }else{
      return this.httpclient.get('https://www.themealdb.com/api/json/v1/1/filter.php?a='+ location)
.pipe(tap((data) => this.cachingService.set(cacheKey,data)))
    }
   }
   getMealBySingleIngredient(ingredientName:any){
    return this.httpclient.get('https://www.themealdb.com/api/json/v1/1/filter.php?i='+ ingredientName)
   }
   
   getMealByID(idMeal:any){
    return this.httpclient.get('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+ idMeal)
   }
   

   

}
