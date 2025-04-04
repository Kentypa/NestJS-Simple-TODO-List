import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Current user password",
  })
  currentPassword: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "New user password",
  })
  newPassword: string;
}
