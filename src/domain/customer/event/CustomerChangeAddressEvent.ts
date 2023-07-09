import { Event } from "../../@shared/event/Event";

export class CustomerChangeAddressEvent implements Event {
    dataTimeOcurred: Date = new Date()

    constructor(readonly payload: any){
    }
}