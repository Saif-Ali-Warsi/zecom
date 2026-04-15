import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  cartItems: Product[] = [];

  constructor(private cartService: CartService) { }


  getTotalPrice() {
    return this.cartItems.reduce(
      (total, item) => total + (item.price * item.quantity),
      0
    );
  }

  increase(item: Product) {
    this.cartService.addToCart(item);
  }

  decrease(item: Product) {
    this.cartService.decreaseQuantity(item);
  }

  remove(item: Product) {
    this.cartService.removeFromCart(item);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  ngOnInit() {

    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
    })

  }
}
