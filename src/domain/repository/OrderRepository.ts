import { Order } from "../entity/Order";
import { Repository } from "./Repository";

export interface OrderRepository extends Repository<Order> {
}