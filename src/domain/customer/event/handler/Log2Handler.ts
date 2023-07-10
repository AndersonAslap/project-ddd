import { EventHandler } from "../../../@shared/event/EventHandler";
import { CustomerCreatedEvent } from "../CustomerCreatedEvent";

export class Log2Handler implements EventHandler {
    
    handle(event: CustomerCreatedEvent): void {
        console.log("Esse é o segundo console.log do evento: CustomerCreated")
    }
}