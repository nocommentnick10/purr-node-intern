import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cards } from './cards.model';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { DeleteCardDto } from './dto/delete-card.dto';

@Injectable()
export class CardsService {

    constructor(@InjectModel(Cards) private cardsRepository: typeof Cards){

    }

    async createCard(dto: CreateCardDto): Promise<Cards>{
        const card = await this.cardsRepository.create(dto)
        return card;
    }

    async getCardById(id: number): Promise<Cards>{
        const card = await this.cardsRepository.findOne({where: {
            id
        }})
        return card;
    }

    async updateCard(dto: UpdateCardDto): Promise<Cards>{
        const card = await this.getCardById(dto.id);

        if (!card){
            throw new NotFoundException({ message: 'Card with such id cannot be found'});
        }
        
        return card.update({
            title: dto.title
        });
    }

    async deleteCard(dto: DeleteCardDto): Promise<void>{
        const card = await this.getCardById(dto.id);

        if (!card){
            throw new NotFoundException({ message: 'Card with such id cannot be found'});
        }

        return card.destroy();
    }
}
