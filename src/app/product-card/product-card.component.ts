import { ShoppingCartService } from './../services/shopping-cart.service';
import { Product } from './../models/product';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('card-width') cardWidth; // TO DO
  @Input('shopping-cart') shoppingCart

  constructor(private cartSerice: ShoppingCartService) { }

  ngOnInit() {
  }

  addToCart(){
    this.cartSerice.addToCart(this.product);
  }

  decrementQuantity(){
    this.cartSerice.decrementItemQuantity(this.product);
  }

  getQuantity(){
    // returns 0 if there is no  a shopping cart yet
    if(!this.shoppingCart) return 0;

    // gets the current product object in the shopping cart if any
    // returns the quanttity of that product if any or 0
    let item = this.shoppingCart.items[this.product.key];
    return item ? item.quantity : 0;
  }
}
