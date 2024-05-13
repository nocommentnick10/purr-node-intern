import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Columns } from './columns.model';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { DeleteColumnDto } from './dto/delete-column.dto';
import { Cards } from 'src/cards/cards.model';
import { ParamsColDto } from './dto/params.dto';
import { where } from 'sequelize';

@Injectable()
export class ColumnsService {

    constructor(@InjectModel(Columns) private columnsRepository: typeof Columns){

    }

    async createColumn(dto: CreateColumnDto): Promise<Columns>{
        const column = await this.columnsRepository.create(dto)
        return column;
    }

    async getColumnById(id: number): Promise<Columns>{
        const column = await this.columnsRepository.findOne({where: {
            id
        }})

        if (!column){
            throw new NotFoundException({ message: 'A column with such id cannor be found' });
        }
        return column;
    }

    async getUserColumns(id: number): Promise<Columns[]>{
        const columns = await this.columnsRepository.findAll({where: {
            userId: id
        }})
        return columns;
    }

    async updateColumn(dto: UpdateColumnDto, params: ParamsColDto): Promise<Columns>{
        const {id, colId} = params;

        const column = await this.getColumnById(colId);

        if (+id !== column.userId){
            throw new ForbiddenException({ message: `UserId does not match the column owner's Id` })
        }

        return column.update({
            title: dto.title
        });
    }

    async deleteColumn(colId: number): Promise<void>{
        const column = await this.getColumnById(colId);

        return column.destroy();
    }

    async isColumnOwner(card: Promise<Cards>, candidateId: number): Promise<boolean>{
        const column = await this.getColumnById((await card).columnId);

        if (!column){
            throw new NotFoundException({ message: 'A column with such id cannot be found' });
        }

        return column.userId === candidateId;
    }

    async isOwner(colId, candidateId): Promise<boolean>{
        return (await this.getColumnById(colId)).userId === candidateId
    }
}
