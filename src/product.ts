export class Product {
    public id: string;
    public name: string;
    public price: number;
    public type: ProductType;
    constructor(id: string, name: string, price: number, type: ProductType = ProductType.DEFAULT) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.type = type;
     }
}

export enum ProductType {
    DEFAULT,
    GROCERY,
}