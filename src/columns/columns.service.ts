import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Columns } from './columns.model';
import { CreateColumnDto } from './dto/create-column.dto';

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
}
