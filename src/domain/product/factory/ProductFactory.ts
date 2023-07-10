import { randomUUID } from "crypto"
import { Product } from "../entity/Product"
import { ProductB } from "../entity/ProductB"
import { ProductInterface } from "../entity/ProductInterface"

export class ProductFactory {
    
    static create(input: Input) : ProductInterface {
        if (input.type === 'a') return new Product(randomUUID(), input.name, input.price)
        if (input.type === 'b') return new ProductB(randomUUID(), input.name, input.price)
        throw new Error("Product type invalid") 
    }
}

type Input = {
    type: string
    name: string
    price: number
}

