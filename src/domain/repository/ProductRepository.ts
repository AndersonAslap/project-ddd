import { Product } from "../entity/Product";
import { Repository } from "./Repository";

export default interface ProductRepository extends Repository<Product> {
}