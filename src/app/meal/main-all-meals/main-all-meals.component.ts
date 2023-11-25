import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/serviecs/api.service';
import { map } from 'rxjs/operators';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@Component({
  selector: 'app-main-all-meals',
  templateUrl: './main-all-meals.component.html',
  styleUrls: ['./main-all-meals.component.scss'],
})
export class MainAllMealsComponent implements OnInit {
  allMeals: any[] = [];

  mealCategoryNames: string = '';
  tabName: string = '';
  initialIngredientsToShow = 20;
additionalIngredientsToShow = 20;
  constructor(private mealApi: ApiService, private route: ActivatedRoute,private router:Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const name = params['name'];
      const type = params['type'];
      this.mealCategoryNames = name;
      console.log(name)
      if (type === 'Ingredients') {
        this.tabName = 'Ingredient';
        console.log('Ingredients')
        this.getallIngredients()
      } else if( type === 'Locations') {
        this.tabName = 'Locations';
        this.getLocationMeals();
      } 
      else if( type === 'SingleLocation') {
        this.tabName = 'SingleLocation';
        this.getMealByLocation(name);
      } 
      else if( type === 'SingleIngredient') {
        this.tabName = 'SingleIngredient';
        this.getMealByIngredient(name);
      } 
      else if( type === 'allMeals') {
        this.tabName = 'Home';
        this.getRandomMeals2();
      }
      else if( type === 'Random') {
        this.tabName = 'Home';
        this.getRandomMeals();
      } 
      else if( type === 'Random2') {
        this.tabName = 'Home';
        this.getRandomMeals2();
      } else if( type === 'inputSearch') {
        this.tabName = 'Home';
        this.getSearchMeals(this.mealCategoryNames);
      } 
      else{
        console.log('Categories')
        this.tabName = 'Categories';
        this.getCategoryMeals(this.mealCategoryNames);
      }
    });
  }
memoizedResults: { [key: string]: any } = {};
maxHistorySize: number = 5;
// Use an array to store recent search values
searchHistory: string[] = [];

getSearchMeals(mealName: any) {
  // Check if results are already memoized
  if (this.memoizedResults[mealName]) {
    this.allMeals = this.memoizedResults[mealName];
    console.log('Results from memoization:', this.allMeals);
  } else {
    this.mealApi.getSearchMeal(mealName).subscribe({
      next: (data: any) => {
        this.allMeals = data.meals;
        console.log('Results from API call:', this.allMeals);
        // Memoize the results
        this.memoizedResults[mealName] = data.meals;

        // Update the search history
        this.updateSearchHistory(mealName);
        console.log(this.searchHistory)
        // Check and evict the least recently used entry if the cache size exceeds the limit
        if (this.searchHistory.length > this.maxHistorySize) {
          this.searchHistory.shift(); // Remove the oldest entry
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

updateSearchHistory(mealName: string) {
  // Remove the existing entry if it exists
  const index = this.searchHistory.indexOf(mealName);
  if (index !== -1) {
    this.searchHistory.splice(index, 1);
  }

  // Add the new entry to the beginning of the array
  this.searchHistory.unshift(mealName);
  this.searchHistory = this.searchHistory.slice(0, 5);

}

  // getSearchMeals(mealName:any){
  //   this.mealApi.getSearchMeal(mealName).subscribe({
  //     next: (data: any) => {
  //       this.allMeals = data.meals;
  //       console.log(this.allMeals)
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }

  getRandomMeals() {
    this.mealApi.getRandomMeal().subscribe({
      next: (data: any) => {
        this.allMeals = data.meals;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

   shuffleArray(array: any[]) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  getRandomMeals2() {
    this.mealApi.getRandomMeal().subscribe({
      next: (data: any) => {
        this.allMeals = this.shuffleArray(data.meals);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getCategoryMeals(name: any) {
    this.mealApi.getSingleCategoryMeal(name).subscribe({
      next: (data: any) => {
        this.allMeals = data.meals;
        console.log(data.meals);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  
  getLocationMeals() {
    this.mealApi
      .getRandomMeal()
      .pipe(
        map((data: any) => {
          if (data?.meals) {
            return data.meals.sort((a: any, b: any) =>
              a.strArea.localeCompare(b.strArea)
            );
          }
          return [];
        })
      )
      .subscribe({
        next: (sortedMeals: []) => {
          this.allMeals = sortedMeals;
          console.log(sortedMeals);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getallIngredients() {
    this.mealApi.getIngredientAll().subscribe({
      next: (data: any) => {
        // this.allMeals = data.meals.slice(0, this.initialIngredientsToShow);
        const endIndex = this.allMeals.length + this.additionalIngredientsToShow;
        this.allMeals = this.allMeals.concat(data.meals.slice(this.allMeals.length, endIndex));
        console.log(data);
        console.log( this.allMeals );
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  loadMoreIngredients() {
  this.getallIngredients()
  }
  
  getMealByLocation(locationName:any){
    this.tabName = 'SingleLocation';
    this.mealApi.getMealByLocation(locationName).subscribe({
      next: (data: any) => {
        this.allMeals = data.meals;
        console.log(data.meals);
      },
      error: (err) => {
        console.log(err);
      },
    })
  }
  
  getMealByIngredient(ingredientName:any){
    this.tabName = 'SingleIngredient';
    this.mealApi.getMealBySingleIngredient(ingredientName).subscribe({
      next: (data: any) => {
        this.allMeals = data.meals;
        console.log( data);
        console.log(  this.allMeals);
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  navigateToDetails(id:any){
    this.router.navigateByUrl(`mealDetails/${id}`);
  }
 
  getIngredientImageUrl(ingredient: string): string {
    return `https://www.themealdb.com/images/ingredients/${ingredient}.png`;
  }
  getIngredientSmallImageUrl(ingredient: string): string{
    return `https://www.themealdb.com/images/ingredients/${ingredient}-small.png`;
  }
  }
  
