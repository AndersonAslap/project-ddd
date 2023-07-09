export class Address {
    
    constructor(readonly street: string, readonly number: number, readonly zipcode: string, readonly state: string) {
        this.validated()
    }

    validated() {
        if (!this.street) throw new Error("Street is required")
        if (this.number <= 0) throw new Error("Number is invalid")
        if (!this.zipcode) throw new Error("Zipcode is required")
        if (!this.state) throw new Error("State is required")
    }
}