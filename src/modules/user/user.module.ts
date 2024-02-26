import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventShiftEntity, UserEntity, UserShiftEntity, UserShiftRequestEntity } from 'src/entities';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports:[TypeOrmModule.forFeature([UserEntity, EventShiftEntity, UserShiftRequestEntity, UserShiftEntity])],
  exports:[UserService]
})
export class UserModule {}
