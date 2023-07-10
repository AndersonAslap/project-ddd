import { randomUUID } from "crypto"
import { OrderFactory } from "../../src/domain/checkout/factory/OrderFactory"

describe("Order factory unit tests", () => {

    it("should create an order", () => {
        const input = {
            id: randomUUID(),
            customer_id: randomUUID(),
            items: [
                {id: randomUUID(), product_id: randomUUID(), price:10, quantity:1},
                {id: randomUUID(), product_id: randomUUID(), price:14, quantity:10},
                {id: randomUUID(), product_id: randomUUID(), price:11, quantity:7},
            ]
        }
        const order = OrderFactory.create(input)
        expect(order).toBeDefined();
        expect(order._id).toBe(input.id)
        expect(order._items.length).toBe(3)
    })
})