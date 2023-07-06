import { randomUUID } from 'crypto'
import { Customer } from '../../src/domain/entity/Customer'
import { Address } from '../../src/domain/entity/Address'

describe("Customer unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            new Customer("", "Aslap")
        }).toThrowError("Id is required")
    })

    it("should throw error when name is empty", () => {
        const id = randomUUID()
        expect(() => {
            new Customer(id, "")
        }).toThrowError("Name is required")
    })

    it("should throw error when name is empty", () => {
        const id = randomUUID()
        const customer = new Customer(id, "Aslap")
        expect(() => {
            customer.changeName("")
        }).toThrowError("Name is required")
    })

    it("should change name", () => {
        const id = randomUUID()
        const customer = new Customer(id, "Aslap")
        customer.changeName("Anderson Santos")
        expect(customer._name).toBe("Anderson Santos")
    })

    it("should not activate customer when dont have address", () => {
        const id = randomUUID()
        const customer = new Customer(id, "Anderson")
        expect(() => {
            customer.activate()
        }).toThrowError("Empty address")
    })

    it("should add address", () => {
        const id = randomUUID()
        const customer = new Customer(id, "Anderson")
        const address = new Address("Street 1", 123, "13330-250", "Pernambuco")
        customer.addAddress(address)
        expect(customer._address.state).toBe("Pernambuco")
    })

    it("should activate customer", () => {
        const id = randomUUID()
        const customer = new Customer(id, "Anderson")
        const address = new Address("Street 1", 123, "13330-250", "Pernambuco")
        customer.addAddress(address)
        customer.activate()
        expect(customer.isActive()).toBeTruthy()
    })

    it("should desactivate customer", () => {
        const id = randomUUID()
        const customer = new Customer(id, "Anderson")
        customer.desactivate()
        expect(customer.isActive()).toBeFalsy()
    })

    it("should created customer and the rewards points started equals zero", () => {
        const id = randomUUID()
        const customer = new Customer(id, "Anderson")
        expect(customer._rewardsPoints).toBe(0)
    })

    it("should increase rewards points", () => {
        const id = randomUUID()
        const customer = new Customer(id, "Anderson")
        customer.increaseRewarsPoints(10)
        expect(customer._rewardsPoints).toBe(10)
    })

    it("should throw error when increase rewards points is invalid", () => {
        const id = randomUUID()
        const customer = new Customer(id, "Anderson")
        expect(() => {
            customer.increaseRewarsPoints(-10)
        }).toThrowError("Rewards points is invalid")
    })
})