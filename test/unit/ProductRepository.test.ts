import { randomUUID } from 'crypto'
import { Sequelize } from "sequelize-typescript"
import { ProductModel } from "../../src/infra/database/sequelize/model/ProductModel"
import ProductRepository from "../../src/domain/repository/ProductRepository"
import { ProductRepositoryDatabase } from "../../src/infra/repository/ProductRepositoryDatabase"
import { Product } from "../../src/domain/entity/Product"

let sequelize: Sequelize
let productRepository: ProductRepository

describe("Product repository unit tests", () => {

    beforeEach(async() => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memoryProductRepository',
            logging: false,
            sync: { force: true }
        })
        sequelize.addModels([ProductModel])
        await sequelize.sync()
        productRepository = new ProductRepositoryDatabase()
    })


    afterEach(async() => {
        await sequelize.close()
    })

    it("should create a product", async () => {
        const id = randomUUID()
        const product = new Product(id, "Product - 1", 15)
        await productRepository.save(product)
        const productModel = await ProductModel.findOne({ where: { id } })
        expect(productModel.toJSON()).toStrictEqual({
            id,
            name: 'Product - 1',
            price:15
        })
    })

    it("should update a product", async () => {
        const id = randomUUID()
        const product = new Product(id, "Product - 1", 15)
        await productRepository.save(product)
        product.changeName("Product - 2")
        product.changePrice(11)
        await productRepository.update(product)
        const productModel = await ProductModel.findOne({ where: { id } })
        expect(productModel.toJSON()).toStrictEqual({
            id,
            name: 'Product - 2',
            price:11
        })
    })

    it("should find a product", async () => {
        const id = randomUUID()
        const product = new Product(id, "Product - 1", 15)
        await productRepository.save(product)
        const productFind = await productRepository.find(id)
        expect(productFind).toEqual(product)
    })

    it("should find all products", async () => {
        const product1 = new Product(randomUUID(), "Product - 1", 15)
        await productRepository.save(product1)
        const product2 = new Product(randomUUID(), "Product - 2", 17)
        await productRepository.save(product2)
        const products = await productRepository.findAll()
        expect(products).toEqual([product1, product2])
    })
})