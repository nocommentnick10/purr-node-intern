import { Module, forwardRef } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Cards } from 'src/cards/cards.model';
import { AuthModule } from 'src/auth/auth.module';
import { Comments } from './comments.model';

@Module({
  providers: [CommentsService],
  controllers: [CommentsController],
  imports: [
    SequelizeModule.forFeature([User, Cards, Comments]),
    forwardRef(() => AuthModule),
  ],
  exports: [
    CommentsService
  ]
})
export class CommentsModule {}
