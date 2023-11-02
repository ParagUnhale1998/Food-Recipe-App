import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeroComponent } from '../shared/components/hero/hero.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FilterCategoryComponent } from './filter-category/filter-category.component';
import { SharedModule } from '../shared/shared/shared.module';
import { MealModule } from '../meal/meal.module';

@NgModule({
  declarations: [
    HomeComponent,
    SidebarComponent,
    FilterCategoryComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbModule,
    SharedModule,
    MealModule
  ],
  exports:[
  ]
})
export class HomeModule { }
