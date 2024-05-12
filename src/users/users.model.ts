import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Columns } from "src/columns/columns.model";
import { Comments } from "src/comments/comments.model";

interface UserCreationAttrs {
    email: string,
    password: string,
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs>{
    @ApiProperty({example: '1'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'kalinovne@gmail.com'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: 'password123Q'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @HasMany(() => Columns)
    columns: [Columns];

    @HasMany(() => Comments)
    comments: [Comments];
}