import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Columns } from "src/columns/columns.model";
import { Comments } from "src/comments/comments.model";
import { User } from "src/users/users.model";

interface CardCreationAttrs {
    columnId: number,
    title: string
}

@Table({tableName: 'cards'})
export class Cards extends Model<Cards, CardCreationAttrs>{
    @ApiProperty({example: '1'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Columns)
    @Column({type: DataType.INTEGER, allowNull: false})
    columnId: number;

    @ApiProperty({example: 'Card title'})
    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @BelongsTo(() => Columns)
    toColumn: Columns;

    @HasMany(() => Comments)
    comments: [Comments];
}