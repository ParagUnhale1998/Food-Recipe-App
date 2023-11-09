import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { MainAllMealsComponent } from './meal/main-all-meals/main-all-meals.component';
import { CartComponent } from './home/cart/cart.component';
import { MealDetailsComponent } from './meal/meal-details/meal-details.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'cart',component:CartComponent},
  {path:'mealDetails/:id',component:MealDetailsComponent},
  {path:'allMeals/:name/:type',component:MainAllMealsComponent},
  {path:'**',component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
