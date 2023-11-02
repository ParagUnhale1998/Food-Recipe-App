import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/serviecs/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
	active = 1;
 
  categories:any;

  constructor(private mealApi:ApiService,private router:Router){
  }

  ngOnInit(): void {
    this.getCategoryMeals()
  }

  getCategoryMeals() {
    this.mealApi.getCategoryMeal().subscribe({
      next: (data: any) => {
        this.categories = data.categories;
        console.log(this.categories);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
   
  searchMeals(searchName:any){
    // this.router.navigateByUrl(`allMeals/${searchName}`);
    this.router.navigateByUrl(`allMeals/${searchName}/${'inputSearch'}`);

  }
  navigateToMeals(name:any){
    this.router.navigateByUrl(`allMeals/${name}/${'categories'}`);

  }
}
