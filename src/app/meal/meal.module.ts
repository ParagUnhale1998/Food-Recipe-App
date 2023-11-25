import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MealRoutingModule } from './meal-routing.module';
import { MealListComponent } from './meal-list/meal-list.component';
import { MealDetailsComponent } from './meal-details/meal-details.component';
import { MainAllMealsComponent } from './main-all-meals/main-all-meals.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { SharedModule } from '../shared/shared/shared.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';


@NgModule({
  declarations: [
    MealListComponent,
    MealDetailsComponent,
    MainAllMealsComponent,
  ],
  imports: [
    CommonModule,
    MealRoutingModule,
    LazyLoadImageModule,
    SharedModule
  ],
  exports:[
    MealListComponent,
    MealDetailsComponent
  ]
})
export class MealModule { }
