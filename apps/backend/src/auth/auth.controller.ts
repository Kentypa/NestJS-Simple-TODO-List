import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseFilters,
  UseGuards,
  ValidationPipe,
  Res,
  Get,
} from "@nestjs/common";
import { Response } from "express";
import { HttpExceptionFilter } from "src/shared/filters/http-exception.filter";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";
import { LoginUserDto } from "./dto/login-user.dto";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { JwtRefreshAuthGuard } from "src/shared/guards/jwt-refresh.guard";
import { UserDecorator } from "src/shared/decorators/user.decorator";
import { User } from "src/shared/entities/user.entity";
import { RegisterUserDto } from "./dto/register-user.dto";
import { SuccessResponseDto } from "./dto/success-response.dto";

@ApiTags("auth")
@Controller("auth")
@UseFilters(HttpExceptionFilter)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  @ApiOperation({ summary: "Add user to database" })
  @ApiResponse({
    status: 201,
    description: "User created successfully",
    type: User,
  })
  @ApiBody({
    type: RegisterUserDto,
    description: "User information",
  })
  @HttpCode(201)
  async register(@Body(new ValidationPipe()) registeredUser: RegisterUserDto) {
    return this.authService.register(registeredUser);
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  @ApiOperation({ summary: "Login user" })
  @ApiResponse({
    status: 201,
    description: "User logged successfully",
    type: SuccessResponseDto,
  })
  @ApiBody({
    type: LoginUserDto,
    description: "User information",
  })
  @HttpCode(201)
  async login(
    @Body(new ValidationPipe()) user: LoginUserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    return await this.authService.login(user.email, user.password, response);
  }

  @UseGuards(JwtAuthGuard)
  @Post("logout")
  @ApiOperation({ summary: "Logout user" })
  @ApiResponse({
    status: 200,
    description: "User logout successfully",
    type: SuccessResponseDto,
  })
  @HttpCode(200)
  async logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }

  @UseGuards(JwtAuthGuard)
  @Get("validate")
  @ApiOperation({ summary: "Validate user token" })
  @ApiResponse({
    status: 200,
    description: "User token validated successfully",
    type: SuccessResponseDto,
  })
  @HttpCode(200)
  async validate() {
    return this.authService.validateToken();
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post("refresh")
  @ApiOperation({ summary: "Refresh user token" })
  @ApiResponse({
    status: 200,
    description: "User token refreshed successfully",
    type: SuccessResponseDto,
  })
  @HttpCode(200)
  @Post("refresh")
  @HttpCode(200)
  async refreshToken(
    @Res({ passthrough: true }) response: Response,
    @UserDecorator() user: User
  ) {
    return this.authService.refresh(user, response);
  }
}
