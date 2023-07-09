import { Product } from "../../../../domain/product/entity/Product";
import ProductRepository from "../../../../domain/product/repository/ProductRepository";
import { ProductModel } from "../../database/sequelize/model/ProductModel";

export class ProductRepositoryDatabase implements ProductRepository {
    
    async save(entity: Product): Promise<void> {
        await ProductModel.create({
            id: entity._id,
            name: entity._name,
            price: entity._price
        })
    }

    async update(entity: Product): Promise<void> {
        await ProductModel.update(
            {
                name: entity._name,
                price: entity._price
            }, {
                where: {
                    id: entity._id,
                }
            }
        )
    }

    async find(id: string): Promise<Product> {
        const productData = await ProductModel.findOne({ where: { id } })
        return new Product(productData.id,productData.name,productData.price)
    }

    async findAll(): Promise<Product[]> {
        const productData = await ProductModel.findAll()
        return productData.map((product) => new Product(product.id, product.name, product.price))
    }
}