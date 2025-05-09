import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class UpdateTodoDto {
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
