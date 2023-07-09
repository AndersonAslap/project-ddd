import { Event } from "../@shared/Event";

export class CustomerChangeAddressEvent implements Event {
    dataTimeOcurred: Date = new Date()

    constructor(readonly payload: any){
    }
}