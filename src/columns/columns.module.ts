import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Columns } from './columns.model';
import { User } from 'src/users/users.model';

@Module({
  providers: [ColumnsService],
  controllers: [ColumnsController],
  imports: [
  SequelizeModule.forFeature([User, Columns])
  ]
})
export class ColumnsModule {}
