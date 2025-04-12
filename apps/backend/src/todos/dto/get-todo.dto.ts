import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
import { BaseTodoDto } from "./base-todo.dto";

export class GetTodoDto extends BaseTodoDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: "ID of todo",
    type: "number",
    minimum: 1,
  })
  id: number;
}
