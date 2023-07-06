import { randomUUID } from 'crypto'
import { Item } from "../../src/domain/entity/Item";
import { Product } from "../../src/domain/entity/Product"
import { Order } from '../../src/domain/entity/Order';
import { Customer } from '../../src/domain/entity/Customer';
import { OrderService } from '../../src/domain/service/OrderService';

let customer : Customer;
let product1 : Product;
let product2 : Product;
let product3 : Product;

describe("Order service unit tests", () => {

    beforeAll(() => {
        customer = new Customer(randomUUID(), "Anderson Santos")
        product1 = new Product(randomUUID(), "Product 1", 10)
        product2 = new Product(randomUUID(), "Product 2", 15)
        product3 = new Product(randomUUID(), "Product 3", 10)
    })

    it("should get total of all orders", () => {
        const orders : Order[] = [
            new Order(randomUUID(), customer._id, [
                new Item(randomUUID(), product1._id, product1._price, 1),
                new Item(randomUUID(), product2._id, product2._price, 2),
                new Item(randomUUID(), product3._id, product3._price, 12)
            ]),
            new Order(randomUUID(), customer._id, [
                new Item(randomUUID(), product1._id, product1._price, 11),
                new Item(randomUUID(), product2._id, product2._price, 27),
            ])
        ]
        const total = OrderService.calculateTotal(orders)
        expect(total).toBe(675)
    })

    it("should place an order", () => {
        const items : Item[] = [
                new Item(randomUUID(), product1._id, product1._price, 1),
                new Item(randomUUID(), product2._id, product2._price, 2),
                new Item(randomUUID(), product3._id, product3._price, 12)
            ]
        const order = OrderService.placeOrder(customer, items);
        expect(order._total).toBe(160)
        expect(customer._rewardsPoints).toBe(80)
    })

    it("should place an order", () => {
        const items : Item[] = []
        expect(() => {
            const order = OrderService.placeOrder(customer, items);
        }).toThrowError("Order must have at least one item")
    })
})