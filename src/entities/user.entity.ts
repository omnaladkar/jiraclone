import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
// import { UserRole } from './enums';

export enum UserRole {
  DEVELOPER = 'developer',
  TESTER = 'tester',
  MANAGER = 'manager',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.DEVELOPER,
  })
  role: UserRole;
}
