import { Component } from '@angular/core';
import { CartService } from 'src/app/core/serviecs/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartItems: any[] = [];

  constructor(private cartService:CartService){
    this.cartItems = this.cartService.getCartItems();
  }

  removeFromCart(itemId:any){
   this.cartService.removeFromCart(itemId)
   this.cartItems = this.cartService.getCartItems();
  }
}
