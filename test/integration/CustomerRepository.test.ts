import { randomUUID } from 'crypto'
import { Sequelize } from "sequelize-typescript"
import { Customer } from '../../src/domain/customer/entity/Customer'
import { CustomerRepository } from '../../src/domain/customer/repository/CustomerRepository'
import { CustomerModel } from '../../src/infra/customer/database/sequelize/model/CustomerModel'
import { CustomerRepositoryDatabase } from '../../src/infra/customer/repository/sequelize/CustomerRepositoryDatabase'
import { CreatedCustomer } from '../../src/application/use-cases/customer/CreatedCustomer'
import { Log1Handler } from '../../src/domain/customer/event/handler/Log1Handler'
import { Log2Handler } from '../../src/domain/customer/event/handler/Log2Handler'

let sequelize: Sequelize
let customerRepository: CustomerRepository

describe("Customer repository unit tests", () => {

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: 'storage/:memoryCustomerRepository',
            logging: false,
            sync: { force: true }
        });
        sequelize.addModels([CustomerModel])
        await sequelize.sync()
        customerRepository = new CustomerRepositoryDatabase()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should create customer", async () => {
        const input  = {
            id: randomUUID(),
            name: "Anderson"
        }
        const createdCustomer = new CreatedCustomer(customerRepository)
        createdCustomer.execute(input)
        const customerModel = await CustomerModel.findOne({ where : { id: input.id } })
        expect(customerModel.toJSON()).toStrictEqual({
            id: input.id,
            name: 'Anderson',
            number: null,
            state: null,
            street: null,
            zipcode: null
        })
    })

    it("should update customer", async () => {
        const id = randomUUID()
        const customer = new Customer(id, "Anderson Aslap")
        await customerRepository.save(customer)
        customer.changeName("Anderson Adolfo")
        await customerRepository.update(customer)
        const customerModel = await CustomerModel.findOne({ where : { id } })
        expect(customerModel.toJSON()).toStrictEqual({
            id,
            name: 'Anderson Adolfo',
            number: null,
            state: null,
            street: null,
            zipcode: null
        })
    })

    it("should find a customer", async () => {
        const id = randomUUID()
        const customer = new Customer(id, "Anderson Santos")
        await customerRepository.save(customer)
        const customerFind = await customerRepository.find(id)
        expect(customerFind).toEqual(customer)
    })

    it("should find all customers", async () => {
        const customer1 = new Customer(randomUUID(), "Anderson Aslap")
        await customerRepository.save(customer1)
        const customer2 = new Customer(randomUUID(), "Anderson Santos")
        await customerRepository.save(customer2)
        const customers = await customerRepository.findAll()
        expect(customers.sort()).toEqual([customer1, customer2].sort())
    })

    it("should create a user and published event", () => {
        const spyEventHandler1 = jest.spyOn(Log1Handler.prototype, "handle");
        const spyEventHandler2 = jest.spyOn(Log2Handler.prototype, "handle");
        const input  = {
            id: randomUUID(),
            name: "Anderson Adolfo"
        }
        const createdCustomer = new CreatedCustomer(customerRepository)
        createdCustomer.execute(input)
        expect(spyEventHandler1).toBeCalled()
        expect(spyEventHandler2).toBeCalled()
    })
})