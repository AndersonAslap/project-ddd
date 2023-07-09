import {
    Table,
    Model,
    PrimaryKey,
    Column,
    ForeignKey,
    BelongsTo,
  } from "sequelize-typescript";
import { ProductModel } from "../../../../product/database/sequelize/model/ProductModel";
import { OrderModel } from "./OrderModel";

@Table({
tableName: "items",
timestamps: false,
})
export class ItemModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => ProductModel)
    @Column({ allowNull: false })
    declare product_id: string;

    @BelongsTo(() => ProductModel)
    declare product: ProductModel;

    @ForeignKey(() => OrderModel)
    @Column({ allowNull: false })
    declare order_id: string;

    @BelongsTo(() => OrderModel)
    declare order: OrderModel;

    @Column({ allowNull: false })
    declare quantity: number;

    @Column({ allowNull: false })
    declare price: number;
}