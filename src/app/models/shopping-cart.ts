import { Product } from './product';
import { ShoppingCartIem } from './shopping-cart-item';

export class ShoppingCart{
    
    itemsArray: ShoppingCartIem[] = [];

    constructor(public items: { [key: string]: ShoppingCartIem } ) {
      for(let productKey in items){
        let item = items[productKey];
        this.itemsArray.push(new ShoppingCartIem(item.product, item.quantity));
      }
    }


    get productIds(){
      return Object.keys(this.items);
    }

    get totalPrice(){
      let sum = 0;
      for(let i=0; i < this.itemsArray.length; i++){
        sum += this.itemsArray[i].totalPrice;
      }
        
      return sum;
    }

    get totalItemsCount(){
      let count = 0;
      for(let productKey in this.items)
            count += this.items[productKey].quantity;

      return count;
    }

    getQuantity(product: Product){
  
      // gets the current product object in the shopping cart if any
      // returns the quanttity of that product if any or 0
      let item = this.items[product.key];
      return item ? item.quantity : 0;
    }
}