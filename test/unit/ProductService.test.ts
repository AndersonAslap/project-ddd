import { randomUUID } from 'crypto'
import { Product } from '../../src/domain/product/entity/Product'
import { ProductService } from '../../src/domain/product/service/ProductService'

describe("Product service unit tests", () => {

    it("should cange the prices of all products increase", () => {
        const products: Product[] = [
            new Product(randomUUID(), 'Product 1', 10),
            new Product(randomUUID(), 'Product 2', 15),
            new Product(randomUUID(), 'Product 3', 20)
        ]
        ProductService.increasePrice(products, 100)
        expect(products[0]._price).toBe(20)
        expect(products[1]._price).toBe(30)
        expect(products[2]._price).toBe(40)
    })

    it("should cange the prices of all products decrease", () => {
        const products: Product[] = [
            new Product(randomUUID(), 'Product 1', 10),
            new Product(randomUUID(), 'Product 2', 15),
            new Product(randomUUID(), 'Product 3', 20)
        ]
        ProductService.decreasePrice(products, 100)
        expect(products[0]._price).toBe(0)
        expect(products[1]._price).toBe(0)
        expect(products[2]._price).toBe(0)
    })
})