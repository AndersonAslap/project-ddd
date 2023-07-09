import { Event } from "../@shared/Event";

export class CustomerCreatedEvent implements Event {
    dataTimeOcurred: Date = new Date()

    constructor(readonly payload: any){
    }   
}