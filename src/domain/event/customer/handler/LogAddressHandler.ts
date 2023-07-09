import { Event } from "../../@shared/Event";
import { EventHandler } from "../../@shared/EventHandler";

export class LogAddressHandler implements EventHandler {
    
    handle(event: Event): void {
        console.log(`Endereço do cliente: ${event.payload.id}, ${event.payload.name} alterado para: ${event.payload.address.street}, ${event.payload.address.number} - ${event.payload.address.zipcode}, ${event.payload.address.state}`)
    }
}