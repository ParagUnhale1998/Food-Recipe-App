import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/core/serviecs/api.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.scss'],
})
export class MealListComponent implements OnInit {
  @Input() tabName: string = '';

  allMeals: any;
  randomMeals!: any[];
  categoryMeals!: any[];
  locationMeals!: any[];
  ingredientMeals!: any[];
  constructor(private mealApi: ApiService) {}

  ngOnInit(): void {
    if (this.tabName === 'Home') {
      this.getRandomMeals();
    } else if (this.tabName === 'Categories') {
      this.getCategoryMeals();
    } else if (this.tabName === 'Locations') {
      this.getLocationMeals();
    } else if (this.tabName === 'Ingredient') {
      this.getIngredientMeals();
    }
  }

  getRandomMeals() {
    if (this.randomMeals && this.randomMeals.length > 0) {
      console.log('works');
    } else {
      console.log('not works');
      this.mealApi.getRandomMeal().subscribe({
        next: (data: any) => {
          this.allMeals = data.meals;
          this.randomMeals = data.meals.map((meal: any) => ({ ...meal })); // Use map to create a deep copy
          console.log(this.allMeals);
          console.log(this.randomMeals);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
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

  getCategoryMeals() {
    this.mealApi.getCategoryMeal().subscribe({
      next: (data: any) => {
        this.allMeals = data.categories;
        const categoriesData: [] = data.categories;
        this.categoryMeals.push(...categoriesData);
        console.log(this.allMeals);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getIngredientMeals() {
    this.mealApi.getIngredientMeal().subscribe({
      next: (data: any) => {
        this.allMeals = data.meals;
        console.log(data.meals);
        const ingredientMealsData: [] = data.meals;

        this.ingredientMeals.push(...ingredientMealsData);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
