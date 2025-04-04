import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/auth.entity";
import { LoginUserDto } from "./dto/login-user.dto";
import { RegisterUserDto } from "./dto/register-user.dto";
import { hash, compare } from "bcrypt";
import { EncryptionConfig } from "src/config/encription";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private authRepository: Repository<User>
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.authRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException("User data is not match");
    }

    return user;
  }

  async add(user: RegisterUserDto) {
    const existingUser = await this.authRepository.findOne({
      where: { email: user.email },
    });

    if (existingUser) {
      throw new ConflictException("Email already in use");
    }

    const password = user.password;
    const passwordHash = await hash(password, EncryptionConfig.SALT_OR_ROUNDS);

    const newUser = this.authRepository.create({
      email: user.email,
      password: passwordHash,
    });

    return this.authRepository.save(newUser);
  }

  async getById(id: number): Promise<User> {
    const user = await this.authRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async remove(id: number) {
    const user = await this.getById(id);

    return this.authRepository.remove(user);
  }

  async update(id: number, userInfo: LoginUserDto) {
    const user = await this.getById(id);

    const password = userInfo.password;
    const passwordHash = await hash(password, EncryptionConfig.SALT_OR_ROUNDS);

    const newUser = this.authRepository.create({
      email: userInfo.email,
      password: passwordHash,
    });

    const updatedUser = this.authRepository.merge(user, newUser);

    return this.authRepository.save(updatedUser);
  }
}
