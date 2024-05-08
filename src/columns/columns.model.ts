import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ColumnsCreationAttr {
    userId: number,
    title: string,
}

@Table({tableName: 'columns'})
export class Columns extends Model<Columns, ColumnsCreationAttr>{
    @ApiProperty({example: '1'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: '1'})
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number;

    @ApiProperty({example: 'Column title'})
    @Column({type: DataType.STRING, allowNull: false})
    title: string;
}