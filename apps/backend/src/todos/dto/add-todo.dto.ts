import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AddTodoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "Make a button with properties...",
    description: "Description of todo",
    type: "string",
  })
  task: string;
}
