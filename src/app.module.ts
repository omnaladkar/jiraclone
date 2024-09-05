import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { StoryModule } from './story/story.module';
import { AssigneeHistoryModule } from './assignee-history/assignee-history.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'jira_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Load all entities
      synchronize: true,
    }),
    UserModule,
    StoryModule,
    AssigneeHistoryModule,
  ],
})
export class AppModule {}
