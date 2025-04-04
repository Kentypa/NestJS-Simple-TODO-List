import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Put,
  Session,
  UnauthorizedException,
  UseFilters,
  ValidationPipe,
} from "@nestjs/common";
import { HttpExceptionFilter } from "src/shared/filters/http-exception.filter";
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
} from "@nestjs/swagger";
import { UserService } from "./user.service";
import { GetUserDto } from "./dto/get-user.dto";
import { UpdateEmailDto } from "./dto/update-email.dto";
import { UpdatePasswordDto } from "./dto/update-password";

@ApiBearerAuth()
@ApiTags("user")
@Controller("user")
@UseFilters(HttpExceptionFilter)
export class UserController {
  constructor(private userService: UserService) {}
  @Get("me")
  @ApiOperation({ summary: "Get user by session ID" })
  @ApiResponse({
    status: 200,
    description: "User information",
    type: GetUserDto,
  })
  @HttpCode(200)
  async getCurrentUser(
    @Session() session: Record<string, any>
  ): Promise<GetUserDto> {
    if (!session.userId) {
      throw new UnauthorizedException("Not authenticated");
    }

    return this.userService.getById(session.userId);
  }

  @Delete()
  @ApiOperation({ summary: "Remove user from database" })
  @ApiResponse({
    status: 200,
    description: "User removed successfully",
  })
  @ApiQuery({
    name: "id",
    description: "ID of user",
    type: "number",
    example: 1,
  })
  @HttpCode(200)
  async removeUser(@Session() session: Record<string, any>) {
    return this.userService.remove(session.userId);
  }

  @Put("update-email")
  @ApiOperation({ summary: "Update user email from database" })
  @ApiResponse({
    status: 200,
    description: "Email updated successfully",
  })
  @ApiBody({
    type: UpdateEmailDto,
    description: "Updated user email",
  })
  @HttpCode(200)
  async updateUserEmail(
    @Body(new ValidationPipe()) newEmail: UpdateEmailDto,
    @Session() session: Record<string, any>
  ) {
    return this.userService.updateEmail(session.userId, newEmail);
  }

  @Put("update-password")
  @ApiOperation({ summary: "Update user password from database" })
  @ApiResponse({
    status: 200,
    description: "Password updated successfully",
  })
  @ApiBody({
    type: UpdatePasswordDto,
    description: "Updated user password",
  })
  @HttpCode(200)
  async updateUserPassword(
    @Body(new ValidationPipe()) newPassword: UpdatePasswordDto,
    @Session() session: Record<string, any>
  ) {
    return this.userService.updatePassword(session.userId, newPassword);
  }
}
