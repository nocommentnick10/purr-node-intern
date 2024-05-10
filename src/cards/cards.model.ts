import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Columns } from "src/columns/columns.model";

interface CardCreationAttrs {
    columnId: number,
    title: string
}

@Table({tableName: 'cards'})
export class Cards extends Model<Cards, CardCreationAttrs>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Columns)
    @Column({type: DataType.INTEGER, allowNull: false})
    columnId: number;

    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @BelongsTo(() => Columns)
    toColumn: Columns;
}