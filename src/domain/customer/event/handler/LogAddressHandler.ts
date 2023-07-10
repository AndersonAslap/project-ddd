import { EventHandler } from "../../../@shared/event/EventHandler";
import { CustomerChangeAddressEvent } from "../CustomerChangeAddressEvent";

export class LogAddressHandler implements EventHandler {
    
    handle(event: CustomerChangeAddressEvent): void {
        console.log(`Endereço do cliente: ${event.payload.id}, ${event.payload.name} alterado para: ${event.payload.address.street}, ${event.payload.address.number} - ${event.payload.address.zipcode}, ${event.payload.address.state}`)
    }
}