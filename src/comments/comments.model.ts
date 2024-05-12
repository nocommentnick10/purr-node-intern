import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Cards } from "src/cards/cards.model";
import { User } from "src/users/users.model";

interface CommentCreationAttrs {
    userId: number,
    CardId: number,
    title: string
}

@Table({tableName: 'comments'})
export class Comments extends Model<Comments, CommentCreationAttrs>{
    @ApiProperty({example: '1'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number;

    @ForeignKey(() => Cards)
    @Column({type: DataType.INTEGER, allowNull: false})
    cardId: number;

    @ApiProperty({example: 'Comment title'})
    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @BelongsTo(() => User)
    toUser: User;

    @BelongsTo(() => Cards)
    toCard: Cards;
}