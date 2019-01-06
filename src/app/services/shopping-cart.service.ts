import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

  private async getOrCreateCartId(){
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;

    let result = await this.create();
    console.log('in get or create result key = '+result.key);
    localStorage.setItem('cartId', result.key);
    return result.key;
   
  }

  getCart(cardId: string){
    return this.db.object(this.dbNodeName + '/' + cardId).valueChanges();
  }

  private getItem(cartId: string, productKey: string): AngularFireObject<any>{
     return this.db.object(this.dbNodeName + '/' + cartId + '/items/' + productKey);
  }

  async addToCart(product: Product){
    let cartId = await this.getOrCreateCartId();
    let productRef: AngularFireObject<any> = this.getItem(cartId, product.key);
    let item$ = productRef.valueChanges();
    item$.pipe(take(1)).subscribe(item => {
      if(item) productRef.update({quantity: item.quantity + 1 });
      else productRef.set({product: product, quantity: 1});
    })
  }
}
