import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ColumnsModule } from 'src/columns/columns.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => ColumnsModule),
    JwtModule.register({
      secret: process.env.SECRET || '159AC090D43EFBF8850F699547BD72C52B84BDCE3231128FEA01EB4447641BD8',
      signOptions: {
        expiresIn: '24h',
      }
    })
  ],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}
