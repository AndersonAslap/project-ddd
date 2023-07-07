import { randomUUID } from 'crypto'
import { Sequelize } from "sequelize-typescript"
import { Customer } from '../../src/domain/entity/Customer'
import { CustomerRepository } from '../../src/domain/repository/CustomerRepository'
import { CustomerModel } from '../../src/infra/database/sequelize/model/CustomerModel'
import { CustomerRepositoryDatabase } from '../../src/infra/repository/CustomerRepositoryDatabase'

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
        const id = randomUUID()
        const customer = new Customer(id, "Anderson")
        await customerRepository.save(customer)
        const customerModel = await CustomerModel.findOne({ where : { id } })
        expect(customerModel.toJSON()).toStrictEqual({
            id,
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
        expect(customers).toEqual([customer1, customer2])
    })
})