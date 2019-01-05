import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  filteredProducts: any[];
  products: {name: string}[];
  subscription: Subscription;

  constructor(private productService: ProductService, private router: Router) { 
    this.subscription = productService.getAll()
    .subscribe(products => this.filteredProducts = this.products = products);
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  deleteProduct(id: string){
    if(!confirm('Are you sure you want to delete this product?')) return;

    this.productService.delete(id);
    this.router.navigateByUrl('/admin/products');
  }

  filter(query: string){
    // if the query is not null and empty, filters and resets the filteredProducts field
    // filtering is done with lowercase 
    // if the query is null or an empty string, just sets filteredProducts to products (all from the database) 
    this.filteredProducts = (query) ? 
    this.products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
    this.products;
  }

}
