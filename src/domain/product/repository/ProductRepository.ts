import { Product } from "../entity/Product";
import { Repository } from "../../@shared/repository/Repository";

export default interface ProductRepository extends Repository<Product> {
}