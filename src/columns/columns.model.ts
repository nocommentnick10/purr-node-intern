import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ColumnsCreationAttr {
    userId: number,
    title: string,
}

@Table({tableName: 'columns'})
export class Columns extends Model<Columns, ColumnsCreationAttr>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number;

    @Column({type: DataType.STRING, allowNull: false})
    title: string;
}