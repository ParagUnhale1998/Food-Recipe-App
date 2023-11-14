import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/serviecs/api.service';
import { CachingServiceService } from 'src/app/core/serviecs/caching-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
	active = 1;
 
  categories:any;

  constructor(private mealApi:ApiService,private router:Router,private cachingService:CachingServiceService){
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
    this.router.navigateByUrl(`allMeals/${searchName}/${'inputSearch'}`);

  }
  navigateToMeals(name:any){
    this.router.navigateByUrl(`allMeals/${name}/${'categories'}`);
  }
  // navigateToHome(){
  //   this.router.navigateByUrl(``);
  // }
  navigateToCart(){
    this.router.navigateByUrl(`cart`);
  }
}
