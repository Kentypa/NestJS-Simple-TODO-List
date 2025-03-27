import { IsNotEmpty, IsString } from "class-validator";

export class AddTodoDto {
  @IsString()
  @IsNotEmpty()
  description: string;
}
