import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Story } from './story.entity';
// import { StoryStatus } from './enums';
export enum StoryStatus {
    TODO = 'todo',
    IN_PROGRESS = 'in_progress',
    IN_TESTING = 'in_testing',
    ACCEPTED = 'accepted',
    DONE = 'done',
  }

@Entity()
export class AssigneeHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Story, (story) => story.id)
  story: Story;

  @ManyToOne(() => User, (user) => user.id)
  assignee: User;

  @Column({
    type: 'enum',
    enum: StoryStatus,
  })
  status: StoryStatus;

  @CreateDateColumn()
  changedAt: Date;
}
