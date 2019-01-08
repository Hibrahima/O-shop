import { Subscription } from 'rxjs';
import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  cart : ShoppingCart;
  subscription: Subscription;

  constructor(private cartService: ShoppingCartService) { }

  async ngOnInit() {
   this.subscription = (await this.cartService.getCart()).subscribe(cart =>  this.cart = cart);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
