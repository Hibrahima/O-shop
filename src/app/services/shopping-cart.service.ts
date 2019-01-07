import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  cartsRef: AngularFireList<any>;
  dbNodeName = '/shopping-carts';

  constructor(private db: AngularFireDatabase) { 
    this.cartsRef = db.list(this.dbNodeName);
  }

  create(){
    return this.cartsRef.push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<Observable<ShoppingCart>>{
    let cartId: string = await this.getOrCreateCartId();
    let cart$ = this.db.object(this.dbNodeName + '/' + cartId).valueChanges() as Observable<ShoppingCart>;
    return cart$.pipe(map(cart => new ShoppingCart(cart.items)));
    
  }

  async addToCart(product: Product){
    this.updateItemQuantity(product, 1);
  }

  // does not really remove, just decrements the quantity by 1
  async removeFromCart(product: Product){
    this.updateItemQuantity(product, -1);
  }


  private async getOrCreateCartId(): Promise<string>{
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;

    let result = await this.create();
    console.log('in get or create result key = '+result.key);
    localStorage.setItem('cartId', result.key);
    return result.key;
   
  }

  private getItem(cartId: string, productKey: string): AngularFireObject<any>{
     return this.db.object(this.dbNodeName + '/' + cartId + '/items/' + productKey);
  }

  private async updateItemQuantity(product: Product, change: number){
    let cartId = await this.getOrCreateCartId();
    let productRef: AngularFireObject<any> = this.getItem(cartId, product.key);
    let item$ = productRef.valueChanges();
    item$.pipe(take(1)).subscribe(item => {

      // persists a new object which contains a product and
      // sets its quantity to 1 if the product is not in any shopping cart
      // or sets its quantity to the quantity value stored in the database plus 1
      if(item) productRef.update({quantity: item.quantity  + change });
      else productRef.update({product: product, quantity: 1});
    });
  }
 
}
