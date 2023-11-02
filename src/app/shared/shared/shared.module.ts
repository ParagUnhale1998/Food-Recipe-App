import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HeroComponent } from '../components/hero/hero.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HeroComponent
  ],
  imports: [
    CommonModule
  ],exports:[
    HeaderComponent,
    FooterComponent,
    HeroComponent
  ]
})
export class SharedModule { }
