import { Customer } from "../entity/Customer";
import { Repository } from "./Repository";

export interface CustomerRepository extends Repository<Customer> {
}