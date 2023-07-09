import { Address } from "../../domain/entity/Address";
import { Customer } from "../../domain/entity/Customer";
import { CustomerRepository } from "../../domain/repository/CustomerRepository";
import { PublishedEventCustomerCreatedService } from "../../domain/service/PublishedEventCustomerCreatedService";

export class CreatedCustomer {

    constructor(readonly customerRepository: CustomerRepository){
    }

    execute(input: Input) {
        const customer = new Customer(input.id, input.name)
        if (input.address) {
            const address = new Address(input.address.street, input.address.number, input.address.zipcode, input.address.state)
            customer.changeAddress(address)
        }
        this.customerRepository.save(customer)
        PublishedEventCustomerCreatedService.published({})
    }
}

type Input = {
    id: string
    name: string 
    address?: {
        street: string,
        number: number,
        zipcode: string,
        state: string
    }
}