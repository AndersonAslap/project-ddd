import { EventDispatcherImplementation } from "../event/@shared/EventDispatherImplementation";
import { CustomerChangeAddressEvent } from "../event/customer/CustomerChangeAddressEvent";
import { LogAddressHandler } from "../event/customer/handler/LogAddressHandler";

export class PublishedEventCustomerChangeAddressService {
    
    static published(payload: any) {
        const eventDispatch = new EventDispatcherImplementation()
        const logAddressHandler = new LogAddressHandler()
        eventDispatch.register("CustomerChangeAddressEvent", logAddressHandler);
        const customerChangeAddressEvent = new CustomerChangeAddressEvent(payload)
        eventDispatch.notify(customerChangeAddressEvent)
    }
}