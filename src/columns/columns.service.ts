import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Columns } from './columns.model';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { DeleteColumnDto } from './dto/delete-column.dto';

@Injectable()
export class ColumnsService {

    constructor(@InjectModel(Columns) private columnsRepository: typeof Columns){

    }

    async createColumn(dto: CreateColumnDto){
        const column = await this.columnsRepository.create(dto)
        return column;
    }

    async getColumnById(id: number): Promise<Columns>{
        const column = await this.columnsRepository.findOne({where: {
            id
        }})
        return column;
    }

    async updateColumn(dto: UpdateColumnDto){
        const column = await this.getColumnById(dto.id);
        return column.update({
            title: dto.title
        });
    }

    async deleteColumn(dto: DeleteColumnDto){
        const column = await this.getColumnById(dto.id);
        return column.destroy();
    }
}
