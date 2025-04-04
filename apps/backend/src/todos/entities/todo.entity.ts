import { User } from "src/user/entities/user.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  task: string;

  @Column({ default: false })
  isCompleted: boolean;

  @ManyToOne(() => User, (user) => user.todos)
  @JoinColumn({ name: "userId" })
  user: User;
}
