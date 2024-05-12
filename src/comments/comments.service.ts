import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comments } from './comments.model';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentsDto } from './dto/get-comments.dto';
import { UpdateCommentDto } from './dto/update-comments.dto';
import { ParamsCommDto } from './dto/params.dto';

@Injectable()
export class CommentsService {

    constructor(@InjectModel(Comments) private commentsRepository: typeof Comments){
        
    }

    async createComment(dto: CreateCommentDto): Promise<Comments>{
        const comment = await this.commentsRepository.create(dto);
        return comment;
    }

    async getCardComments(dto: GetCommentsDto): Promise<Comments[]>{
        if (!dto.cardId){
            throw new BadRequestException({ message: `Wrond request body, check if cardId is not null`});
        }
        
        const comments = await this.commentsRepository.findAll({where: {
            cardId: dto.cardId
        }})

        return comments;
    }

    async updateComment(dto: UpdateCommentDto, params: ParamsCommDto): Promise<Comments>{
        const {id, commId} = params;

        const comment = await this.commentsRepository.findOne({
            where: {
                id: commId
            }
        })

        if (!comment){
            throw new NotFoundException({ message: `Comment with such id cannot be found` });
        }

        if (+id !== comment.userId){
            throw new ForbiddenException({ message: `UserId does not match the comment owner's Id` });
        }

        return comment.update({
            title: dto.title
        });
    }

    async deleteComment(params: ParamsCommDto): Promise<void>{
        const comment = await this.commentsRepository.findOne({
            where: {
                id: params.commId
            }
        });

        if (!comment){
            throw new NotFoundException({ message: 'Comment with such id cannot be found'});
        }

        if (+params.id !== comment.userId){
            throw new ForbiddenException({ message: `UserId does not match the comment owner's Id` });
        }

        return comment.destroy();
    }
}
