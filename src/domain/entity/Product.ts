export class Product {

    constructor(readonly id: string, private name: string, private price: number) {
        this.validated()
    }

    get _id(): string {
        return this.id
    }

    get _name() {
        return this.name
    }

    get _price() {
        return this.price
    }

    changeName(name: string) {
        this.name = name
        this.validated()
    }

    changePrice(price: number) {
        this.price = price
        this.validated()
    }

    validated() {
        if(!this.id) throw new Error("Id is required")
        if(!this.name) throw new Error("Name is required")
        if(this.price < 0) throw new Error("Price is invalid")
    }
}