import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { debounceTime, switchMap, map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

  searchSubject = new BehaviorSubject<string>('');
  categorySubject = new BehaviorSubject<string>('');

  products: Product[] = [];

  constructor(private productService: ProductService, private cartService: CartService) { }

  onSearch(event: any) {
    const value = event.target.value;
    this.searchSubject.next(value);
  }

  onCategoryChange(event: any) {
    const value = event.target.value;
    this.categorySubject.next(value);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  ngOnInit() {

    this.searchSubject.next('');
    this.categorySubject.next('');

    this.productService.getProducts().subscribe((data: any) => {
      this.products = data;
    });


    combineLatest([
      this.searchSubject.pipe(debounceTime(300)),
      this.categorySubject
    ]).pipe(
      switchMap(([search, category]) => {
        return this.productService.getProducts().pipe(
          map((products: any[]) =>
            products.filter(p => {
              const matchesSearch = p.title
                .toLowerCase()
                .includes(search.toLowerCase());

              const matchesCategory = category
                ? p.category.toLowerCase() === category.toLowerCase()
                : true;

              return matchesSearch && matchesCategory;
            })
          )
        );
      })
    ).subscribe((data: any) => {
      this.products = data;
    });

  }

}
