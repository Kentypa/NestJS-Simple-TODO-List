import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Market {
  @ApiProperty({
    example: "12",
    description: "Market ID",
    type: "number",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "AURORA",
    description: "Market name",
    type: "string",
  })
  @Column()
  name: string;
}
