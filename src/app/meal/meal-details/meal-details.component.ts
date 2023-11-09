import { Component ,OnInit} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/serviecs/api.service';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.scss']
})
export class MealDetailsComponent implements OnInit{
  meal:any;

  constructor(private mealApi:ApiService,private route: ActivatedRoute,private sanitizer: DomSanitizer){
    this.route.params.subscribe((params) => {
      let mealId = params['id'];
      console.log(mealId)
      this.getMeal(mealId)
    })
  }
   
  ngOnInit(): void {
 
   
  }
  getMeal(mealId:any){
    this.mealApi.getMealByID(mealId).subscribe({
      next: (data: any) => {
        this.meal = data.meals[0];
        console.log(data )
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getIngredients(): string[] {
    const ingredients: string[] = [];

    for (let i = 1; i <= 20; i++) {
      const ingredientName = this.meal[`strIngredient${i}`];
      const ingredientMeasure = this.meal[`strMeasure${i}`];

      if (ingredientName && ingredientMeasure) {
        ingredients.push(`${ingredientMeasure} ${ingredientName}`);
      }
    }

    return ingredients;
  }

 
  getVideoUrl(youtubeUrl: string): SafeResourceUrl {
    // Extract the video ID from the YouTube URL
    const videoId = youtubeUrl.split('v=')[1];
    const sanitizedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(sanitizedUrl);
  }
  
} 
