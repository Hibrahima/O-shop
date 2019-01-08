import { Product } from './product';

export class ShoppingCartIem{
    

    constructor(public product: Product, public quantity: number){}

    get totalPrice(): number{
        return this.product.price * this.quantity;
    }
}