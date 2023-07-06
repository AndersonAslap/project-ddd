import {
    Table,
    Model,
    PrimaryKey,
    Column,
    ForeignKey,
    BelongsTo,
    HasMany
  } from "sequelize-typescript";
import { CustomerModel } from "./CustomerModel";
import { ItemModel } from "./ItemModel";

  
@Table({
tableName: "orders",
timestamps: false,
})
export class OrderModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => CustomerModel)
    @Column({ allowNull: false })
    declare customer_id: string;

    @BelongsTo(() => CustomerModel)
    declare customer: CustomerModel;

    @HasMany(() => ItemModel)
    declare items: ItemModel[];

    @Column({ allowNull: false })
    declare total: number;
}