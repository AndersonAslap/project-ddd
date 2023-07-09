import { Event } from "../../@shared/Event";
import { EventHandler } from "../../@shared/EventHandler";

export class Log2Handler implements EventHandler {
    
    handle(event: Event): void {
        console.log("Esse é o segundo console.log do evento: CustomerCreated")
    }
}