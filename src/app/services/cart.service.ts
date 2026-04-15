import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartSubject = new BehaviorSubject<Product[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor() {
    const data = localStorage.getItem('cart');
    const initial = data ? JSON.parse(data) : []
    this.cartSubject.next(initial);
  }

  private saveToStorage(cart: Product[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  addToCart(product: Product) {
    const currentCart = this.cartSubject.value;

    const existingItem = currentCart.find(
      item => item.id === product.id
    );

    let updatedCart;

    if (existingItem) {
      updatedCart = currentCart.map(item =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity ?? 1) + 1 }
          : item
      );
    } else {
      updatedCart = [...currentCart, { ...product, quantity: 1 }];
    }

    this.cartSubject.next(updatedCart);
    this.saveToStorage(updatedCart);
  }

  decreaseQuantity(product: Product) {
    const currentCart = this.cartSubject.value;

    const updatedCart = currentCart.map(item =>
      item.id === product.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ).filter(item => item.quantity > 0);

    this.cartSubject.next(updatedCart);
    this.saveToStorage(updatedCart);
  }

  getCartCount() {
    return this.cart$.pipe(
      map(items =>
        items.reduce((total, item) => total + item.quantity, 0)
      )
    );
  }

  clearCart() {
    this.cartSubject.next([]);
    this.saveToStorage([]);
  }

  removeFromCart(product: Product) {
    const currentCart = this.cartSubject.value;

    const updatedCart = currentCart.filter(
      item => item.id !== product.id
    );

    this.cartSubject.next(updatedCart);
    this.saveToStorage(updatedCart);
  }

  getCartItems() {
    return this.cart$;
  }




}
