import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from '../entities/story.entity'; // Import Story entity
import { StoryService } from './story.service';
import { StoryController } from './story.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Story])], // Add Story entity to TypeORM
  providers: [StoryService],
  controllers: [StoryController],
})
export class StoryModule {}

