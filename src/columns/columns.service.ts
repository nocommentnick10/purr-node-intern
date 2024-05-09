import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Columns } from './columns.model';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { DeleteColumnDto } from './dto/delete-column.dto';

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
}
