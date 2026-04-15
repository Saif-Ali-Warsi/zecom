import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:3000/products'

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>(this.baseUrl);
  }

  searchProducts(query: string) {
    return this.http.get(
      `${this.baseUrl}?title_like=${query}`
    )
  }
}
