import { randomUUID } from "crypto"
import { Customer } from "../entity/Customer"
import { Address } from "../value-object/Address"

export class CustomerFactory {

    static create(input: Input) {
        if (input.address) {
            const address = new Address(input.address.street, input.address.number, input.address.zipcode, input.address.state)
            const customer = new Customer(randomUUID(), input.name)
            customer.changeAddress(address)
            return customer 
        }
        return new Customer(randomUUID(), input.name)
    }
}

type Input = {
    name: string 
    address?: {
        street: string,
        number: number,
        zipcode: string,
        state: string
    }
}