import { Item } from "../entity/Item"
import { Order } from "../entity/Order";

export class OrderFactory {

    static create(input: Input) {
        const items = input.items.map((item) => new Item(item.id, item.product_id, item.price, item.quantity))
        return new Order(input.id, input.customer_id, items)
    }
}

type Input = {
    id: string 
    customer_id: string
    items: {
        id: string 
        product_id: string
        price: number 
        quantity: number
    }[]
}