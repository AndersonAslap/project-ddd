import { randomUUID } from 'crypto'
import { Customer } from "../entity/Customer"
import { Item } from "../entity/Item"
import { Order } from "../entity/Order"

export class OrderService {

    static calculateTotal(orders: Order[]) : number {
        return orders.reduce((acc, item) => acc + item._total, 0)
    }

    static placeOrder(customer: Customer, items: Item[]): Order {
        if (items.length === 0) throw new Error("Order must have at least one item")
        const order = new Order(randomUUID(),customer._id, items)
        customer.increaseRewarsPoints(order._total/2)
        return order
    }
}