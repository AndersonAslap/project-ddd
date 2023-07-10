import { CustomerFactory } from "../../src/domain/customer/factory/CustomerFactory"

describe("Customer factory unit tests", () => {

    it("should create a customer without address", () => {
        const customer = CustomerFactory.create({name: 'Anderson'})
        expect(customer._id).toBeDefined()
        expect(customer._name).toBe('Anderson')
    })

    it("should create a customer with address", () => {
        const customer = CustomerFactory.create({
            name: 'Anderson Adolfo',
            address: {
                street: 'cartés 3',
                number: 196,
                zipcode: '122345-123',
                state: 'Pernambuco'
            }
        })
        expect(customer._id).toBeDefined()
        expect(customer._name).toBe('Anderson Adolfo')
    })
})