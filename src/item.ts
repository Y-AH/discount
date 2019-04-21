import { Product } from "./product";

export class Item {

    public product: Product;
    public quantity: number;

    constructor(product: Product, quantity: number = 1) {
        this.product = product;
        this.quantity = quantity;
    }
}