import { ShoppingCartService } from './../services/shopping-cart.service';
import { AppUser } from './../models/app-user';
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  appUser : AppUser;
  shoppingCartItemsCount;
  cart$: Observable<ShoppingCart>;

  constructor(private auth : AuthService, private cartService: ShoppingCartService) { }

  async ngOnInit(){
    this.auth.appUser$.subscribe(user => this.appUser = user);
    this.cart$ = await this.cartService.getCart();
  }

  logout(){
    this.auth.logout();
  }

}
