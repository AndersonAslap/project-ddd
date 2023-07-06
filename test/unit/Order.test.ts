import { randomUUID } from 'crypto'
import { Order } from '../../src/domain/entity/Order'
import { Item } from '../../src/domain/entity/Item'

describe("Order unit tests", () => {

    it("should throw error when id is empty", () => {
        const customerId = randomUUID()
        expect(() => {
            new Order("", customerId, [])
        }).toThrowError("Id is required")
    })

    it("should throw error when customerId is empty", () => {
        const orderId = randomUUID()
        expect(() => {
            new Order(orderId, "", [])
        }).toThrowError("CustomerId is required")
    })

    it("should throw error when quantity items equals zero", () => {
        const orderId = randomUUID()
        const customerId = randomUUID()
        expect(() => {
            new Order(orderId, customerId, [])
        }).toThrowError("Item quantity must be greater than 0")
    })

    it("should created a order", () => {
        const orderId = randomUUID()
        const customerId = randomUUID()
        const items = [
            new Item(randomUUID(), randomUUID(), 10, 1),
            new Item(randomUUID(), randomUUID(), 10, 1)
        ]
        const order = new Order(orderId, customerId, items)
        expect(order).toBeDefined()
    })

    it("should calculate total", () => {
        const orderId = randomUUID()
        const customerId = randomUUID()
        const items = [
            new Item(randomUUID(), randomUUID(), 10, 1),
            new Item(randomUUID(), randomUUID(), 10, 2)
        ]
        const order = new Order(orderId, customerId, items)
        expect(order._total).toBe(30)
    })
})