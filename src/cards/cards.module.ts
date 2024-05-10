import { Module, forwardRef } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Columns } from 'src/columns/columns.model';
import { Cards } from './cards.model';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/users/users.model';
import { ColumnsService } from 'src/columns/columns.service';
import { ColumnsModule } from 'src/columns/columns.module';

@Module({
  providers: [CardsService],
  controllers: [CardsController],
  imports: [
    SequelizeModule.forFeature([User, Columns, Cards]),
    forwardRef(() => AuthModule),
    ColumnsModule
  ],
  exports: [
    CardsService
  ]
})
export class CardsModule {}
