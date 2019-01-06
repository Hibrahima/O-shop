import { switchMap } from 'rxjs/operators';
import { Product } from './../models/product';
import { ActivatedRoute, Router } from '@angular/router/';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  activatedRoute: string;
  selectedCategory: string;
  cardWidth: string = '15 px'; // TO DO

  constructor(productService: ProductService, route:ActivatedRoute) {

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

  ngOnInit() {
  }

}
