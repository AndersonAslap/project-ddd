import { Address } from "./Address"

export class Customer {
    private address!: Address
    private active: boolean
    private rewardPoints: number

    constructor(readonly id: string, private name: string) {
        this.rewardPoints = 0
        this.active = false
        this.validate()
    }

    get _id(): string {
        return this.id
    }

    get _name(): string {
        return this.name
    }

    get _address(): Address {
        return this.address
    }

    get _rewardsPoints(): number {
        return this.rewardPoints
    }

    increaseRewarsPoints(rewardsPoints: number) {
        if (rewardsPoints < 0) throw new Error("Rewards points is invalid")   
        this.rewardPoints += rewardsPoints
    }

    changeName(name: string) {
        this.name = name 
        this.validate()
    }

    activate() {
        if (!this.address) throw new Error("Empty address")
        this.active = true
    }

    desactivate(){
        this.active = false
    }

    isActive() {
        return this.active
    }

    addAddress(address: Address) {
        this.address = address
    }

    validate() {
        if (!this.id) throw new Error("Id is required") 
        if (!this.name) throw new Error("Name is required")
    }
}