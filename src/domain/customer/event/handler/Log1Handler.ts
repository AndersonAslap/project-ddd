import { EventHandler } from "../../../@shared/event/EventHandler";
import { CustomerCreatedEvent } from "../CustomerCreatedEvent";

export class Log1Handler implements EventHandler {
    
    handle(event: CustomerCreatedEvent): void {
        console.log("Esse é o primeiro console.log do evento: CustomerCreated")
    }
}