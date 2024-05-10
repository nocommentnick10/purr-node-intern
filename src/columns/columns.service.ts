import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Columns } from './columns.model';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { DeleteColumnDto } from './dto/delete-column.dto';
import { Cards } from 'src/cards/cards.model';

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
        return column;
    }

    async updateColumn(dto: UpdateColumnDto): Promise<Columns>{
        const column = await this.getColumnById(dto.id);
        
        if (column.userId === +dto.userId){
            return column.update({
                title: dto.title
            });
        } else {
            throw new ForbiddenException({ message: 'Not allowed to manipulate this column' });
        }
    }

    async deleteColumn(dto: DeleteColumnDto): Promise<void>{
        const column = await this.getColumnById(dto.id);

        if (column.userId === +dto.userId){
            return column.destroy();
        } else {
            throw new ForbiddenException({ message: 'Not allowed to manipulate this column' });
        }
    }

    async isColumnOwner(card: Promise<Cards>, candidateId: number): Promise<boolean>{
        const column = await this.getColumnById((await card).columnId);

        if (!column){
            throw new NotFoundException({ message: 'A column with such id cannot be found' });
        }

        return column.userId === candidateId;
    }
}
