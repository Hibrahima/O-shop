import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {
  
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('card-width') cardWidth; // TO DO
  @Input('shopping-cart') shoppingCart;

  constructor(private cartSerice: ShoppingCartService) { }

  ngOnInit() {
  }

  addToCart(){
    this.cartSerice.addToCart(this.product);
  }

  decrementQuantity(){
    this.cartSerice.removeFromCart(this.product);
  }

  

}
