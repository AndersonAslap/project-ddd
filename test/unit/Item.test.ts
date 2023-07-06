import { randomUUID } from 'crypto'
import { Item } from "../../src/domain/entity/Item"

describe("Item unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            new Item("", randomUUID(), 1, 1)
        }).toThrowError("Id is required")
    })

    it("should throw error when idProduct is empty", () => {
        expect(() => {
            new Item(randomUUID(), "", 1, 1)
        }).toThrowError("IdProduct is required")
    })

    it("should throw error when price is incorrect", () => {
        expect(() => {
            new Item(randomUUID(), randomUUID(), -1, 1)
        }).toThrowError("Price is invalid")
    })

    it("should throw error when quantity is incorrect", () => {
        expect(() => {
            new Item(randomUUID(), randomUUID(), 1, 0)
        }).toThrowError("Quantity is invalid")
    })

    it("should created item", () => {
        const item = new Item(randomUUID(), randomUUID(), 10 ,1)
        expect(item).toBeDefined()
    })
})