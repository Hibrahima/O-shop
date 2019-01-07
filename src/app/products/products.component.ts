import { ShoppingCartService } from './../services/shopping-cart.service';
import { switchMap } from 'rxjs/operators';
import { Product } from './../models/product';
import { ActivatedRoute, Router } from '@angular/router/';
import { ProductService } from './../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  activatedRoute: string;
  selectedCategory: string;
  cardWidth: string = '15 px'; // TO DO
  subscription: Subscription;
  cart: any;

  constructor(
    productService: ProductService, 
    route:ActivatedRoute, 
    private cartService: ShoppingCartService) {

    productService.getAll().pipe(switchMap(products => {
      this.products = products;
      return route.queryParamMap;
    }))
    .subscribe(params => {
        this.selectedCategory = params.get('category');
        this.filteredProducts = (this.selectedCategory) ? 
        this.products.filter(p => p.category === this.selectedCategory) :
        this.products;
      });

    //this.activatedRoute = router.url;
    //console.log(" activated url = "+this.activatedRoute);

   }

  async ngOnInit() {
   this.subscription = (await this.cartService.getCart())
    .subscribe(cart => this.cart = cart);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
