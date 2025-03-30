import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class GetTodoDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: "ID of todo",
    type: "number",
    minimum: 1,
  })
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "Make a button with properties...",
    description: "Description of todo",
    type: "string",
  })
  task: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    example: true,
    description: "Status of todo completition",
    type: "boolean",
  })
  isCompleted: boolean;
}
