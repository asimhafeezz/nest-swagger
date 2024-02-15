import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports:[TypeOrmModule.forFeature([UserEntity])],
  exports:[UserService]
})
export class UserModule {}
