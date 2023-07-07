import { Item } from "./Item"

export class Order {
    private total: number

    constructor(readonly id: string, private customerId: string, private items: Item[]) {
        this.total = this.calculateTotal()
        this.validated()
    }

    get _id(): string {
        return this.id
    }

    get _total(): number {
        return this.total
    }

    get _customerId(): string {
        return this.customerId
    }

    get _items(): Item[] {
        return this.items
    }

    changeItems(items: Item[]) {
        this.items = items
        this.total = this.calculateTotal()
        this.validated()
    }

    calculateTotal() {
        return this.items.reduce((acc, item) => acc + item.calculateTotal(), 0)
    }

    validated() {
        if (!this.id) throw new Error("Id is required") 
        if (!this.customerId) throw new Error("CustomerId is required") 
        if (this.items.length === 0) throw new Error("Item quantity must be greater than 0") 
    }
}