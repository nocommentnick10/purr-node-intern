import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { GetColumnDto } from './dto/get-column.dto';

@Controller('columns')
export class ColumnsController {

    constructor(private columnsService: ColumnsService){

    }

    @Post()
    create(@Body() columnDto: CreateColumnDto){
        return this.columnsService.createColumn(columnDto);
    }

    @Get(':id')
    getColumnById(@Param('id', ParseIntPipe) id: number): Promise<GetColumnDto>{
        return this.columnsService.getColumnById(id);
    }
}
