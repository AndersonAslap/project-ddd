import { EventDispatcherImplementation } from "../event/@shared/EventDispatherImplementation";
import { CustomerCreatedEvent } from "../event/customer/CustomerCreatedEvent";
import { Log1Handler } from "../event/customer/handler/Log1Handler";
import { Log2Handler } from "../event/customer/handler/Log2Handler";

export class PublishedEventCustomerCreatedService {
    
    static published(payload: any) {
        const eventDispatch = new EventDispatcherImplementation()
        const log1Handler = new Log1Handler()
        const log2Handler = new Log2Handler()
        eventDispatch.register("CustomerCreatedEvent", log1Handler);
        eventDispatch.register("CustomerCreatedEvent", log2Handler);
        const customerCreatedEvent = new CustomerCreatedEvent(payload)
        eventDispatch.notify(customerCreatedEvent)
    }
}