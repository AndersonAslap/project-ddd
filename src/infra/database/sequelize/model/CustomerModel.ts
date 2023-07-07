import { Model, Table, PrimaryKey, Column } from "sequelize-typescript";

@Table({ 
    tableName: 'customers',
    timestamps: false
})
export class CustomerModel extends Model {

    @PrimaryKey
    @Column
    declare id: string 

    @Column({ allowNull: false })
    declare name: string

    @Column
    declare street: string 

    @Column
    declare number: number 

    @Column
    declare zipcode: string

    @Column
    declare state: string
}