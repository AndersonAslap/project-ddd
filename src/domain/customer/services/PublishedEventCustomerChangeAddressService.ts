import { EventDispatcherImplementation } from "../../@shared/event/EventDispatherImplementation";
import { CustomerChangeAddressEvent } from "../event/CustomerChangeAddressEvent";
import { LogAddressHandler } from "../event/handler/LogAddressHandler";

export class PublishedEventCustomerChangeAddressService {
    
    static published(payload: any) {
        const eventDispatch = new EventDispatcherImplementation()
        const logAddressHandler = new LogAddressHandler()
        eventDispatch.register("CustomerChangeAddressEvent", logAddressHandler);
        const customerChangeAddressEvent = new CustomerChangeAddressEvent(payload)
        eventDispatch.notify(customerChangeAddressEvent)
    }
}