import { Module, forwardRef } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Columns } from './columns.model';
import { User } from 'src/users/users.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [ColumnsService],
  controllers: [ColumnsController],
  imports: [
  SequelizeModule.forFeature([User, Columns]),
  forwardRef(() => AuthModule),
  ],
  exports: [
    ColumnsService
  ]
})
export class ColumnsModule {}
