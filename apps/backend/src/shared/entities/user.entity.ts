import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { Todo } from "src/todos/entities/todo.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class User {
  @ApiProperty({
    example: "12",
    description: "User ID",
    type: "number",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "test@gmail.com",
    description: "User email",
    type: "string",
  })
  @Column({ type: "varchar", length: 60 })
  email: string;

  @ApiProperty({
    example: "qwerty1234",
    description: "User password",
    type: "string",
  })
  @Column({ type: "varchar", length: 100 })
  @Exclude()
  password: string;

  @ApiProperty({
    example: "[{id: 1, task: 'make a coffee', isCompleted: false}]",
    description: "Array of todos",
    type: "string",
  })
  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];

  @ApiProperty({
    example: "2353reaswdEvc@#W3vAWv4AW$#ca4cAW$caw4vaWEcVAWC3a#Aw3c",
    description: "Hashed refresh token",
    type: "string",
  })
  @Column({ nullable: true })
  refreshToken: string;
}
