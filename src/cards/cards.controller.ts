import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CardsService } from './cards.service';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Cards } from './cards.model';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { DeleteCardDto } from './dto/delete-card.dto';
import { CardsGuard } from './guards/put-delete-cards.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ColumnsService } from 'src/columns/columns.service';
import { ParamsCardDto } from './dto/params.dto';
import { GetCardsGuard } from './guards/get-cards.guard';

@ApiTags('cards')
@Controller('/users/:id/cards')
export class CardsController {

    constructor(private cardsService: CardsService,
        private columnsService: ColumnsService){

    }

    @ApiOperation({summary: 'Create card'})
    @ApiResponse({status: 200, type: Cards})
    @UseGuards(JWTAuthGuard)
    @Post()
    create(@Body() cardDto: CreateCardDto): Promise<Cards>{
        return this.cardsService.createCard(cardDto);
    }

    @ApiOperation({summary: 'Get user cards'})
    @ApiResponse({status: 200, type: Cards})
    @UseGuards(JWTAuthGuard)
    @UseGuards(GetCardsGuard)
    @Get()
    getUserCards(@Param('id', ParseIntPipe) id: number): Promise<Cards[]>{
        const userColumns = this.columnsService.getUserColumns(id);

        return this.cardsService.getUserCards(userColumns);
    }

    @ApiOperation({summary: 'Update card'})
    @ApiResponse({status: 200, type: Cards})
    @UseGuards(JWTAuthGuard)
    @UseGuards(CardsGuard)
    @Put(':cardId')
    update(@Param() params: ParamsCardDto, @Body() cardDto: UpdateCardDto): Promise<Cards>{
        return this.cardsService.updateCard(cardDto, params);
    }

    @ApiOperation({summary: 'Delete card'})
    @ApiResponse({status: 200, type: null})
    @UseGuards(JWTAuthGuard)
    @UseGuards(CardsGuard)
    @Delete(':cardId')
    deleteColumn(@Param('cardId', ParseIntPipe) cardId: number): Promise<void>{
        return this.cardsService.deleteCard(cardId);
    }
}
