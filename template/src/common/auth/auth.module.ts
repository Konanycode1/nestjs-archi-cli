import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from 'common/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt/constant';
import { JwtGuard } from './jwt/auth.guard';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UsersModule } from 'features/user/user.module';

@Module({
  imports:[
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5m' },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtGuard, JwtStrategy],
  exports:[AuthService, JwtModule, JwtGuard]
})
export class AuthModule {}
