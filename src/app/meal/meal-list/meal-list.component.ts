import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/core/serviecs/api.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/serviecs/cart.service';

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
  
  constructor(private mealApi: ApiService,private router:Router,private cartService:CartService) {}

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
      this.mealApi.getRandomMeal().subscribe({
        next: (data: any) => {
          this.allMeals = data.meals;
          // console.log(this.allMeals);
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
          // console.log( this.allMeals )
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
        // console.log( this.allMeals )
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
        // console.log( this.allMeals )
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  navigateToCart(meal:any){
    this.cartService.addToCart(meal)
    console.log(meal) 
    this.router.navigateByUrl('cart')
  }
  navigateToLocationMeals(name:any){
    this.router.navigateByUrl(`allMeals/${name}/${'SingleLocation'}`);
  }
  navigateToCategoryMeals(name:any){
    this.router.navigateByUrl(`allMeals/${name}/${'categories'}`);
  }
  navigateToIngredient(name:any){
    this.router.navigateByUrl(`allMeals/${name}/${name}`);
  }
  navigateToDetails(id:any){
    this.router.navigateByUrl(`mealDetails/${id}`);
  }
}
