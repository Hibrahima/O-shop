import { ActivatedRoute } from '@angular/router/';
import { ProductService } from './../../services/product.service';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product = {};
  productId;

  constructor(
    route: ActivatedRoute,
    categoryService: CategoryService, 
    private productService: ProductService,
    private router: Router
    ) { 
    this.categories$ = categoryService.getAll();
    
    // gets the id query param from the activated route
    this.productId = route.snapshot.paramMap.get('id');

    /** gets the related product from the database if id is not null
        and initializes the product field
        take operator will automatically unsubscribe when the subscribe operation is complete
    **/
    if(this.productId) 
       productService.get(this.productId).pipe(take(1)).subscribe(p => this.product = p);
  }

  ngOnInit() {
  }

  save(product){
    // if the product id is not null, we are updating, so updates the related product
    // if not, then create a new product
    if(this.productId)
      this.productService.update(this.productId, product);
    else
        this.productService.create(product);
      
    this.router.navigateByUrl('/admin/products');
  }

}
