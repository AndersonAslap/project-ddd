import { Customer } from "../entity/Customer";
import { Repository } from "../../@shared/repository/Repository";

export interface CustomerRepository extends Repository<Customer> {
}