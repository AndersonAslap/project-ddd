import { Event } from "./Event";

export interface EventHandler<T extends Event=Event> {
    handle(event: T): void;
}