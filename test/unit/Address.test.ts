import { Address } from "../../src/domain/customer/value-object/Address"

describe("Address unit tests", () => {

    it("should throw error when street is empty", () => {
        expect(() => {
            new Address("", 1, "12345-123", "Pernambuco")
        }).toThrowError("Street is required")
    })

    it("should throw error when number is invalid", () => {
        expect(() => {
            new Address("Caetés", -1, "12345-123", "Pernambuco")
        }).toThrowError("Number is invalid")
    })

    it("should throw error when zipcode is required", () => {
        expect(() => {
            new Address("Caetés", 1, "", "Pernambuco")
        }).toThrowError("Zipcode is required")
    })

    it("should throw error when state is required", () => {
        expect(() => {
            new Address("Caetés", 1, "12345-123", "")
        }).toThrowError("State is required")
    })

    it("should created address", () => {
        const address = new Address("Caetés", 1, "12345-123", "Pernambuco")
        expect(address).toBeDefined()
    })
})