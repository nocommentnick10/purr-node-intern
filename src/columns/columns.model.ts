import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Cards } from "src/cards/cards.model";
import { User } from "src/users/users.model";

interface ColumnsCreationAttr {
    userId: number,
    title: string,
}

@Table({tableName: 'columns'})
export class Columns extends Model<Columns, ColumnsCreationAttr>{
    @ApiProperty({example: '1'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    //@ApiProperty({example: '1'})
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number;

    @ApiProperty({example: 'Column title'})
    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @BelongsTo(() => User)
    author: User;

    @HasMany(() => Cards)
    columns: [Cards];
}