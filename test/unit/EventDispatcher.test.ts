
import { EventDispatcherImplementation } from "../../src/domain/@shared/event/EventDispatherImplementation";
import { ProductCreatedEvent } from "../../src/domain/product/event/ProductCreatedEvent";
import { SendEmailWhenProductIsCreatedHandler } from "../../src/domain/product/event/handler/SendEmailWhenPeoductIsCreatedHandler";


describe("Domain events tests", () => {

    it("should create an event dispatcher", () => {
        const eventDispatcher = new EventDispatcherImplementation();
        expect(eventDispatcher).toBeDefined();
    })

    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcherImplementation();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers('ProductCreatedEvent')).toBeDefined();
        expect(eventDispatcher.getEventHandlers('ProductCreatedEvent').length).toBe(1);
        expect(eventDispatcher.getEventHandlers('ProductCreatedEvent')[0]).toMatchObject(eventHandler);
    })

    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcherImplementation();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers('ProductCreatedEvent')[0]).toMatchObject(eventHandler);
        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers('ProductCreatedEvent').length).toBe(0);
    })

    it("should unregister all events", () => {
        const eventDispatcher = new EventDispatcherImplementation();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers('ProductCreatedEvent')[0]).toMatchObject(eventHandler);
        eventDispatcher.unregisterAll();
        expect(eventDispatcher.getEventHandlers('ProductCreatedEvent')).toBe(undefined);
    })

    it("should notify an event", () => {
        const eventDispatcher = new EventDispatcherImplementation();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers('ProductCreatedEvent')[0]).toMatchObject(eventHandler);
        const productCreatedEvent = new ProductCreatedEvent({email:'aslap@gmail.com'})
        eventDispatcher.notify(productCreatedEvent);
        expect(spyEventHandler).toHaveBeenCalled();
    })
})