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
  @Input('shopping-cart') shoppingCart;

  constructor(private cartSerice: ShoppingCartService) { }

  ngOnInit() {
  }

  addToCart(){
    this.cartSerice.addToCart(this.product);
  }

}
