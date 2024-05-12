import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { Columns } from './columns.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ColumnsGuard } from './guards/columns.guard';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ParamsColDto } from './dto/params.dto';

@ApiTags('columns')
@Controller('/users/:id/columns')
export class ColumnsController {

    constructor(private columnsService: ColumnsService){

    }

    @ApiOperation({summary: 'Create column'})
    @ApiResponse({status: 200, type: Columns})
    @UseGuards(JWTAuthGuard)
    @Post()
    create(@Body() columnDto: CreateColumnDto): Promise<Columns>{
        return this.columnsService.createColumn(columnDto);
    }

    @ApiOperation({summary: 'Get user columns'})
    @ApiResponse({status: 200, type: Columns})
    @UseGuards(JWTAuthGuard)
    @UseGuards(ColumnsGuard)
    @Get()
    getUserColumns(@Param('id', ParseIntPipe) id: number): Promise<Columns[]>{
        return this.columnsService.getUserColumns(id);
    }

    @ApiOperation({summary: 'Update column'})
    @ApiResponse({status: 200, type: Columns})
    @UseGuards(JWTAuthGuard)
    @UseGuards(ColumnsGuard)
    @Put(':colId')
    update(@Param() params: ParamsColDto, @Body() columnDto: UpdateColumnDto): Promise<Columns>{
        return this.columnsService.updateColumn(columnDto, params);
    }

    @ApiOperation({summary: 'Delete column'})
    @ApiResponse({status: 200, type: null})
    @UseGuards(JWTAuthGuard)
    @UseGuards(ColumnsGuard)
    @Delete(':colId')
    deleteColumn(@Param('colId', ParseIntPipe) colId: number): Promise<void>{
        return this.columnsService.deleteColumn(colId);
    }
}
