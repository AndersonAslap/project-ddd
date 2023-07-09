export class Item {

    constructor(readonly id: string, readonly idProduct: string, readonly price: number, readonly quantity: number){
        this.validated()
    }

    get _id(): string {
        return this.id
    }

    get _idProduct(): string {
        return this.idProduct
    }

    get _price(): number {
        return this.price
    }

    get _quantity(): number {
        return this.quantity
    }

    calculateTotal() {
        return this.price * this.quantity
    }

    validated() {
        if (!this.id) throw new Error("Id is required")
        if (!this.idProduct) throw new Error("IdProduct is required")
        if (this.price < 0) throw new Error("Price is invalid")
        if (this.quantity <= 0) throw new Error("Quantity is invalid")
    }
}