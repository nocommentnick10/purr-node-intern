import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Comments } from './comments.model';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentsDto } from './dto/get-comments.dto';
import { ParamsCommDto } from './dto/params.dto';
import { UpdateCommentDto } from './dto/update-comments.dto';
import { CommentsGuard } from './guards/comments.guard';

@ApiTags('comments')
@Controller('/users/:id/comments')
export class CommentsController {

    constructor(private commentsService: CommentsService){

    }

    @ApiOperation({summary: 'Create comment'})
    @ApiResponse({status: 200, type: Comments})
    @UseGuards(JWTAuthGuard)
    @Post()
    create(@Body() columnDto: CreateCommentDto): Promise<Comments>{
        return this.commentsService.createComment(columnDto);
    }

    @ApiOperation({summary: 'Get card comments'})
    @ApiResponse({status: 200, type: Comments})
    @UseGuards(JWTAuthGuard)
    @Get()
    getUserColumns(@Body() commentDto: GetCommentsDto): Promise<Comments[]>{
        return this.commentsService.getCardComments(commentDto);
    }

    @ApiOperation({summary: 'Update comment'})
    @ApiResponse({status: 200, type: Comments})
    @UseGuards(JWTAuthGuard)
    @UseGuards(CommentsGuard)
    @Put(':commId')
    update(@Param() params: ParamsCommDto, @Body() commentDto: UpdateCommentDto): Promise<Comments>{
        return this.commentsService.updateComment(commentDto, params);
    }

    @ApiOperation({summary: 'Delete comment'})
    @ApiResponse({status: 200, type: null})
    @UseGuards(JWTAuthGuard)
    @UseGuards(CommentsGuard)
    @Delete(':commId')
    deleteColumn(@Param() params: ParamsCommDto): Promise<void>{
        return this.commentsService.deleteComment(params);
    }
}
