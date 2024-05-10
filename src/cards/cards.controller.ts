import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CardsService } from './cards.service';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Cards } from './cards.model';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { DeleteCardDto } from './dto/delete-card.dto';
import { CardsGuard } from './guards/cards.guard';

@Controller('cards')
export class CardsController {

    constructor(private cardsService: CardsService){

    }

    @UseGuards(JWTAuthGuard)
    @Post()
    create(@Body() cardDto: CreateCardDto): Promise<Cards>{
        return this.cardsService.createCard(cardDto);
    }

    @UseGuards(JWTAuthGuard)
    @Get(':id')
    getCardById(@Param('id', ParseIntPipe) id: number): Promise<Cards>{
        return this.cardsService.getCardById(id);
    }

    @UseGuards(JWTAuthGuard)
    @UseGuards(CardsGuard)
    @Put()
    update(@Body() cardDto: UpdateCardDto): Promise<Cards>{
        return this.cardsService.updateCard(cardDto);
    }

    @UseGuards(JWTAuthGuard)
    @UseGuards(CardsGuard)
    @Delete()
    deleteColumn(@Body() cardDto: DeleteCardDto): Promise<void>{
        return this.cardsService.deleteCard(cardDto);
    }
}
