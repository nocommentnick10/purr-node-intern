import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Columns } from './columns.model';

@Module({
  providers: [ColumnsService],
  controllers: [ColumnsController],
  imports: [
  SequelizeModule.forFeature([Columns])
  ]
})
export class ColumnsModule {}
