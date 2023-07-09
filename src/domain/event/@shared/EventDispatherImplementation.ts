import { Event } from "./Event";
import { EventDispatcher } from "./EventDispatcher";
import { EventHandler } from "./EventHandler";

export class EventDispatcherImplementation implements EventDispatcher {

    private eventHandlers : { [eventName: string] : EventHandler[] } = {}

    getEventHandlers(eventName: string): EventHandler[] {
        return this.eventHandlers[eventName]
    }

    register(eventName: string, eventHandler: EventHandler<Event>): void {
        if (!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = []
        }
        this.eventHandlers[eventName].push(eventHandler)
    }

    unregister(eventName: string, eventHandler: EventHandler<Event>): void {
        if (this.eventHandlers[eventName]) {
            const index = this.eventHandlers[eventName].indexOf(eventHandler);
            if (index != -1) this.eventHandlers[eventName].splice(index, 1)
        }
    }

    unregisterAll(): void {
        this.eventHandlers = {}
    }

    notify(event: Event): void {
        const eventName = event.constructor.name
        if (this.eventHandlers[eventName]) {
            this.eventHandlers[eventName].forEach((eventHandler) => {
                eventHandler.handle(event)
            })
        }
    }
}