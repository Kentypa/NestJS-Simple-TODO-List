import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Achievements {
  @ApiProperty({
    example: "12",
    description: "Achievement ID",
    type: "number",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Make a 100 todos",
    description: "Achievement name",
    type: "string",
  })
  @Column()
  name: string;
}
