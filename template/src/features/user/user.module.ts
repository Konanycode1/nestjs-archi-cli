import { Module } from '@nestjs/common';
import { UsersService } from 'features/user/core/use-case/user.service';
import { UsersController } from 'features/user/inBound/user.controller';
import { UserRepository } from 'features/user/outBound/user.repository';
import { DbModule } from 'config/db.module';

@Module({
  imports: [DbModule],
  controllers: [UsersController],
  
  providers: [UsersService, UserRepository],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}
