import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class UpdateTodoDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  isCompleted: boolean;
}
