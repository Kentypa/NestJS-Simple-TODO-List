import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RegisterUserDto } from "./dto/register-user.dto";
import { hash, compare } from "bcrypt";
import { EncryptionConfig } from "src/config/encription";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/shared/entities/user.entity";
import { plainToInstance } from "class-transformer";
import { ConfigService } from "@nestjs/config";
import { Response } from "express";
import { JwtPayload } from "./types/jwt-payload.type";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private authRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.authRepository.findOneBy({ email });

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      throw new BadRequestException("Passwords is not match");
    }

    return user;
  }

  async login(email: string, password: string, response: Response) {
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload: JwtPayload = {
      sub: user.id.toString(),
      username: user.email,
    };

    const expiresAccessToken = new Date(
      Date.now() +
        parseInt(
          this.configService.getOrThrow<string>("jwt.access_token_expires_in")
        )
    );

    const expiresRefreshToken = new Date(
      Date.now() +
        parseInt(
          this.configService.getOrThrow<string>("jwt.refresh_token_expires_in")
        )
    );

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow<string>("jwt.access_token_secret"),
      expiresIn: `${this.configService.getOrThrow<string>(
        "jwt.access_token_expires_in"
      )}ms`,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow<string>("jwt.refresh_token_secret"),
      expiresIn: `${this.configService.getOrThrow<string>(
        "jwt.refresh_token_expires_in"
      )}ms`,
    });

    await this.userService.updateRefreshToken(user.id, refreshToken);

    response.cookie("Authentication", accessToken, {
      httpOnly: true,
      secure: false,
      expires: expiresAccessToken,
    });

    response.cookie("Refresh", refreshToken, {
      httpOnly: true,
      secure: false,
      expires: expiresRefreshToken,
    });

    return {
      success: true,
    };
  }

  async verifyUserRefreshToken(refreshToken: string, userId: number) {
    const user = await this.getById(userId);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const authenticated = await compare(refreshToken, user.refreshToken);

    if (!authenticated) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async register(user: RegisterUserDto) {
    const existingUser = await this.authRepository.findOne({
      where: { email: user.email },
    });

    if (existingUser) {
      throw new ConflictException("Email already in use");
    }

    const userPassword = user.password;
    const passwordHash = await hash(
      userPassword,
      EncryptionConfig.SALT_OR_ROUNDS
    );

    const newUser = this.authRepository.create({
      email: user.email,
      password: passwordHash,
    });

    const result = plainToInstance(
      User,
      await this.authRepository.save(newUser)
    );

    return result;
  }

  async getById(id: number): Promise<User> {
    const user = await this.authRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async logout(response: Response) {
    response.clearCookie("Authentication", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    response.clearCookie("Refresh", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return { success: true };
  }

  async refresh(user: User, response: Response) {
    const payload: JwtPayload = {
      sub: user.id.toString(),
      username: user.email,
    };

    const expiresAccessToken = new Date(
      Date.now() +
        parseInt(
          this.configService.getOrThrow<string>("jwt.access_token_expires_in")
        )
    );

    const expiresRefreshToken = new Date(
      Date.now() +
        parseInt(
          this.configService.getOrThrow<string>("jwt.refresh_token_expires_in")
        )
    );

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow<string>("jwt.access_token_secret"),
      expiresIn: `${this.configService.getOrThrow<string>(
        "jwt.access_token_expires_in"
      )}ms`,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow<string>("jwt.refresh_token_secret"),
      expiresIn: `${this.configService.getOrThrow<string>(
        "jwt.refresh_token_expires_in"
      )}ms`,
    });

    await this.userService.updateRefreshToken(user.id, refreshToken);

    response.cookie("Authentication", accessToken, {
      httpOnly: true,
      secure: false,
      expires: expiresAccessToken,
    });

    response.cookie("Refresh", refreshToken, {
      httpOnly: true,
      secure: false,
      expires: expiresRefreshToken,
    });

    return {
      success: true,
    };
  }
}
