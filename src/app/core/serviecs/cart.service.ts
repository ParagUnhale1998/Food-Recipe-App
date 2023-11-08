import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];

  constructor() {
    const storedCartItems = localStorage.getItem('cartItems');
    this.cartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
   }

  getCartItems(): any[] {
    return this.cartItems;
  }

  addToCart(meal: any): void {
    const mealExists = this.cartItems.some(item => item.idMeal === meal.idMeal);
    if (!mealExists) {
      this.cartItems.push(meal);
      this.updateLocalStorage();
    }else{
      console.log('mealExists already in the list')
    }

  }

  removeFromCart(itemId: any): void {
    this.cartItems = this.cartItems.filter(item => item.idMeal !== itemId);
    this.updateLocalStorage();

  }

  private updateLocalStorage(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

}
