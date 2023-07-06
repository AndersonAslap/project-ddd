import { Customer } from "../../domain/entity/Customer";
import { CustomerRepository } from "../../domain/repository/CustomerRepository";
import { CustomerModel } from "../database/sequelize/model/CustomerModel";

export class CustomerRepositoryDatabase implements CustomerRepository {

    async save(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity._id,
            name: entity._name
        });
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update({
            name: entity._name
        }, {
            where: { id: entity._id }
        })
    }

    async find(id: string): Promise<Customer> {
        const customerData = await CustomerModel.findOne({where: {id}})
        return new Customer(customerData.id, customerData.name)
    }

    async findAll(): Promise<Customer[]> {
        const customerData = await CustomerModel.findAll()
        return customerData.map((customer) => new Customer(customer.id, customer.name))
    }
}