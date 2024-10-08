import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity'; // Import User entity
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Add User entity to TypeORM
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}

