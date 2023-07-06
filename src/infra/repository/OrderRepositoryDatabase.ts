import { Order } from "../../domain/entity/Order";
import { OrderRepository } from "../../domain/repository/OrderRepository";
import { ItemModel } from "../database/sequelize/model/ItemModel";
import { OrderModel } from "../database/sequelize/model/OrderModel";

export class OrderRepositoryDatabase implements OrderRepository {
    
    async save(entity: Order): Promise<void> {
        await OrderModel.create(
          {
            id: entity.id,
            customer_id: entity._customerId,
            total: entity._total,
            items: entity._items.map((item) => ({
              id: item._id,
              price: item._price,
              product_id: item._idProduct,
              quantity: item._quantity,
            })),
          },
          {
            include: [{ model: ItemModel }],
          }
        );
      }
    update(entity: Order): Promise<void> {
        throw new Error("Method not implemented.");
    }
    find(id: string): Promise<Order> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Order[]> {
        throw new Error("Method not implemented.");
    }
}