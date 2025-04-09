import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Put,
  UseFilters,
  UseGuards,
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
import { UserDecorator } from "src/shared/decorators/user.decorator";
import { User } from "src/shared/entities/user.entity";
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard";

@ApiBearerAuth()
@ApiTags("user")
@Controller("user")
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
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
  async getCurrentUser(@UserDecorator() user: User): Promise<GetUserDto> {
    return this.userService.getSafeUser(user.id);
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
  async removeUser(@UserDecorator() user: User) {
    return this.userService.remove(user.id);
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
    @UserDecorator() user: User
  ) {
    return this.userService.updateEmail(user.id, newEmail);
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
    @UserDecorator() user: User
  ) {
    return this.userService.updatePassword(user.id, newPassword);
  }
}
