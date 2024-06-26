import { Module, forwardRef } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Columns } from 'src/columns/columns.model';
import { Cards } from './cards.model';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/users/users.model';
import { ColumnsModule } from 'src/columns/columns.module';
import { Comments } from 'src/comments/comments.model';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
  providers: [CardsService],
  controllers: [CardsController],
  imports: [
    SequelizeModule.forFeature([User, Columns, Cards, Comments]),
    forwardRef(() => AuthModule),
    ColumnsModule,
    CardsModule,
    CommentsModule,
  ],
  exports: [
    CardsService
  ]
})
export class CardsModule {}
