import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  cartCount: number = 0;

  constructor(private cartService: CartService) { }



  ngOnInit() {
    this.cartService.getCartCount().subscribe(count => {
      this.cartCount = count;
    })
  }
}
