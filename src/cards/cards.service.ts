import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cards } from './cards.model';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { DeleteCardDto } from './dto/delete-card.dto';
import { Columns } from 'src/columns/columns.model';
import { ParamsCardDto } from './dto/params.dto';

@Injectable()
export class CardsService {

    constructor(@InjectModel(Cards) private cardsRepository: typeof Cards){

    }

    async createCard(dto: CreateCardDto): Promise<Cards>{
        const card = await this.cardsRepository.create(dto)
        return card;
    }

    async getUserCards(userColumns: Promise<Columns[]>): Promise<Cards[]>{
        const userColumnIdAll = (await userColumns).map((column) => {
            return column.dataValues.id
        });

        return this.cardsRepository.findAll({
            where: {
                columnId: userColumnIdAll
            }
        })
    }

    async updateCard(dto: UpdateCardDto, params: ParamsCardDto): Promise<Cards>{
        const {id, cardId} = params;

        const card = await this.cardsRepository.findOne({
            where: {
                id: cardId
            }
        });

        if (!card){
            throw new NotFoundException({ message: 'Card with such id cannot be found'});
        }
        
        return card.update({
            title: dto.title
        });
    }

    async getColumnIdByCard(cardId: number): Promise<number>{
        return (await this.cardsRepository.findOne({
            where: {
                id: cardId
            }
        })).columnId;
    }

    async deleteCard(cardId: number): Promise<void>{
        const card = await this.cardsRepository.findOne({
            where: {
                id: cardId
            }
        })

        if (!card){
            throw new NotFoundException({ message: 'Card with such id cannot be found'});
        }

        return card.destroy();
    }
}
