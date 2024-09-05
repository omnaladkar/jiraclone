import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssigneeHistory } from '../entities/assignee.entity'; // Import AssigneeHistory entity
import { AssigneeService } from './assignee.service';
import { AssigneeController } from './assignee.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AssigneeHistory])], // Add AssigneeHistory entity to TypeORM
  providers: [AssigneeService],
  controllers: [AssigneeController],
})
export class AssigneeHistoryModule {}
