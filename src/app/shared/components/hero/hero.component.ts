import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {

  constructor(private router:Router){}

  navigateToMeals(){
    this.router.navigateByUrl(`allMeals/${'allMeals'}/${'allMeals'}`);
  }

}
