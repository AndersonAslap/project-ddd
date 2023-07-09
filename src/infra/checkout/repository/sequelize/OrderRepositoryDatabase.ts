import { Item } from "../../../../domain/checkout/entity/Item";
import { Order } from "../../../../domain/checkout/entity/Order";
import { OrderRepository } from "../../../../domain/checkout/repository/OrderRepository";
import { ItemModel } from "../../database/sequelize/model/ItemModel";
import { OrderModel } from "../../database/sequelize/model/OrderModel";

export class OrderRepositoryDatabase implements OrderRepository {
    
  async save(entity: Order): Promise<void> { 
      await OrderModel.create(
        {
          id: entity._id,
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

  async update(entity: Order): Promise<void> {
    const sequelize = OrderModel.sequelize;
    await sequelize.transaction(async (transaction) => {
        await ItemModel.destroy({ where: { order_id: entity.id }, transaction: transaction });
        const items = entity._items.map((item) => ({
            id: item.id,
            price: item.price,
            product_id: item._idProduct,
            quantity: item.quantity,
            order_id: entity.id
        }));
        await ItemModel.bulkCreate(items, { transaction: transaction });
        await OrderModel.update({ total: entity._total }, { where: { id: entity.id }, transaction: transaction });
    });
  }
  
  async find(id: string): Promise<Order> {
    const orderData = await OrderModel.findOne({ where: { id }, include: [{ model: ItemModel }] });
    const items = orderData.items.map((item) => new Item(item.id, item.product_id, item.price, item.quantity));
    return new Order(orderData.id, orderData.customer_id, items);
  }
  
  async findAll(): Promise<Order[]> {
    const orderData = await OrderModel.findAll({ include: [{ model: ItemModel }] })
    return orderData.map((order) => 
      new Order(
        order.id, 
        order.customer_id, 
        order.items.map((item) => new Item(item.id, item.product_id, item.price, item.quantity))
      )
    )
  }
}