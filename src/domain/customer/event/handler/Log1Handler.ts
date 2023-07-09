import { Event } from "../../@shared/Event";
import { EventHandler } from "../../@shared/EventHandler";

export class Log1Handler implements EventHandler {
    
    handle(event: Event): void {
        console.log("Esse é o primeiro console.log do evento: CustomerCreated")
    }
}