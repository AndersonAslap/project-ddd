import { Event } from "../@shared/Event";

export class ProductCreatedEvent implements Event {
    dataTimeOcurred: Date = new Date()

    constructor(readonly payload: any){
    }   
}