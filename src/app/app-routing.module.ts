import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { MainAllMealsComponent } from './meal/main-all-meals/main-all-meals.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'allMeals/:name/:type',component:MainAllMealsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
