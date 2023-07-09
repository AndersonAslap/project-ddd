import { Order } from "../entity/Order";
import { Repository } from "../../@shared/repository/Repository";

export interface OrderRepository extends Repository<Order> {
}