import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty } from "class-validator";

export class SuccessResponseDto {
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    example: true,
    description: "Status if response is success",
    type: "boolean",
  })
  success: boolean;
}
