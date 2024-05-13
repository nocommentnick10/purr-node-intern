import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { ColumnsModule } from './columns/columns.module';
import { Columns } from './columns/columns.model';
import { AuthModule } from './auth/auth.module';
import { CardsModule } from './cards/cards.module';
import { Cards } from './cards/cards.model';
import { CommentsModule } from './comments/comments.module';
import { Comments } from './comments/comments.model';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Columns, Cards, Comments],
      autoLoadModels: true,
    }),
    UsersModule,
    ColumnsModule,
    AuthModule,
    CardsModule,
    CommentsModule,
  ],
})
export class AppModule {}
