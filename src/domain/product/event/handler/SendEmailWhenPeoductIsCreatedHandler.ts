import { Event } from "../../../@shared/event/Event";
import { EventHandler } from "../../../@shared/event/EventHandler";
import { ProductCreatedEvent } from "../ProductCreatedEvent";

export class SendEmailWhenProductIsCreatedHandler implements EventHandler<ProductCreatedEvent> {
    
    handle(event: ProductCreatedEvent): void {
        console.log(`send email to ${event.payload.email}`)
    }
}