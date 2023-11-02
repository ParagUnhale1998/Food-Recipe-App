import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/serviecs/api.service';
import { map } from 'rxjs/operators';

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
  constructor(private mealApi: ApiService, private route: ActivatedRoute) {}

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

  getSearchMeals(mealName:any){
    this.mealApi.getSearchMeal(mealName).subscribe({
      next: (data: any) => {
        this.allMeals = data.meals;
        console.log(this.allMeals)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

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
  

}
