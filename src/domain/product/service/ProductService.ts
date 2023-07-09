import { Product } from "../entity/Product";

export class ProductService {

    static increasePrice(products: Product[], percentage: number) : void {
        products.forEach(product => {
            product.changePrice(product._price + (product._price * (percentage/100)))
        })
    }

    static decreasePrice(products: Product[], percentage: number) : void {
        products.forEach(product => {
            product.changePrice(product._price - (product._price * (percentage/100)))
        })
    }
}