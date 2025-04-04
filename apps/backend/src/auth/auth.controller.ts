import {
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Post,
  Session,
  UseFilters,
  ValidationPipe,
} from "@nestjs/common";
import { HttpExceptionFilter } from "src/shared/filters/http-exception.filter";
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from "@nestjs/swagger";
import { RegisterUserDto } from "./dto/register-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { AuthService } from "./auth.service";

@ApiBearerAuth()
@ApiTags("auth")
@Controller("auth")
@UseFilters(HttpExceptionFilter)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("sign-up")
  @ApiOperation({ summary: "Add user to database" })
  @ApiResponse({
    status: 201,
    description: "User created successfully",
  })
  @ApiBody({
    type: RegisterUserDto,
    description: "User information",
  })
  @HttpCode(201)
  async addUser(@Body(new ValidationPipe()) addUser: RegisterUserDto) {
    return this.authService.add(addUser);
  }

  @Post("sign-in")
  @ApiOperation({ summary: "Login user" })
  @ApiResponse({
    status: 201,
    description: "User logged successfully",
  })
  @ApiBody({
    type: LoginUserDto,
    description: "User information",
  })
  @HttpCode(201)
  async signIn(
    @Body(new ValidationPipe()) user: LoginUserDto,
    @Session() session: Record<string, any>
  ) {
    const validatedUser = await this.authService.validateUser(
      user.email,
      user.password
    );

    session.userId = validatedUser.id;

    return { success: true };
  }

  @Post("logout")
  @ApiOperation({ summary: "Logout user" })
  @ApiResponse({
    status: 200,
    description: "User logout successfully",
  })
  @HttpCode(200)
  async logout(@Session() session: Record<string, any>) {
    session.destroy((err: Error) => {
      if (err) {
        throw new InternalServerErrorException("Could not log out");
      }
    });
    return { success: true };
  }
}
