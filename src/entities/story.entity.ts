import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
// import { StoryStatus } from './enums';

export enum StoryStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  IN_TESTING = 'in_testing',
  ACCEPTED = 'accepted',
  DONE = 'done',
}

@Entity()
export class Story {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  heading: string;

  @Column('text')
  body: string;

  @ManyToOne(() => User, (user) => user.id)
  assignee: User;

  @ManyToOne(() => User, (user) => user.id)
  createdBy: User;

  @ManyToOne(() => User, (user) => user.id)
  reporter: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: StoryStatus,
    default: StoryStatus.TODO,
  })
  status: StoryStatus;
}
