import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class BaseTodoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "Make a button with properties...",
    description: "Description of todo",
  })
  task: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    example: true,
    description: "Status of todo completion",
  })
  isCompleted: boolean;
}
