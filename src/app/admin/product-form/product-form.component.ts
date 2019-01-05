import { ProductService } from './../../services/product.service';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;

  constructor(
    categoryService: CategoryService, 
    private productService: ProductService,
    private router: Router) { 
    this.categories$ = categoryService.getAll();
  }

  ngOnInit() {
  }

  save(product){
    this.productService.create(product);
    this.router.navigateByUrl('/admin/products');
  }

}
