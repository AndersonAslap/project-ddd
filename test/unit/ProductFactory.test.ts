import { ProductFactory } from "../../src/domain/product/factory/ProductFactory";

describe("Product factory unit tests", () => {
    
    it("should create a product", () => {
        const product = ProductFactory.create({
            type: 'a',
            name: 'Product 1',
            price: 10
        });
        expect(product._id).toBeDefined()
        expect(product._name).toBe("Product 1")
        expect(product._price).toBe(10)
        expect(product.constructor.name).toBe("Product")
    })

    it("should create a product type B", () => {
        const product = ProductFactory.create({
            type: 'b',
            name: 'Product 2',
            price: 10
        });
        expect(product._id).toBeDefined()
        expect(product._name).toBe("Product 2")
        expect(product._price).toBe(20)
        expect(product.constructor.name).toBe("ProductB")
    })


    it("should throw error when product type is incorrect", () => {
        expect(() => {
            ProductFactory.create({
                type: 'd',
                name: 'Product 2',
                price: 10
            });
        }).toThrowError("Product type invalid")
    })
})