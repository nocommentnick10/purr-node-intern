import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { GetColumnDto } from './dto/get-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { Columns } from './columns.model';
import { DeleteColumnDto } from './dto/delete-column.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('columns')
@Controller('columns')
export class ColumnsController {

    constructor(private columnsService: ColumnsService){

    }

    @ApiOperation({summary: 'Create column'})
    @ApiResponse({status: 200, type: Columns})
    @Post()
    create(@Body() columnDto: CreateColumnDto): Promise<Columns>{
        return this.columnsService.createColumn(columnDto);
    }

    @ApiOperation({summary: 'Get column by id'})
    @ApiResponse({status: 200, type: Columns})
    @Get(':id')
    getColumnById(@Param('id', ParseIntPipe) id: number): Promise<Columns>{
        return this.columnsService.getColumnById(id);
    }

    @ApiOperation({summary: 'Update column'})
    @ApiResponse({status: 200, type: Columns})
    @Put()
    update(@Body() columnDto: UpdateColumnDto): Promise<Columns>{
        return this.columnsService.updateColumn(columnDto);
    }

    @ApiOperation({summary: 'Delete column'})
    @ApiResponse({status: 200, type: null})
    @Delete()
    deleteColumn(@Body() columnDto: DeleteColumnDto): Promise<void>{
        return this.columnsService.deleteColumn(columnDto);
    }
}
