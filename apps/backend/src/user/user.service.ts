import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../shared/entities/user.entity";
import { UpdateEmailDto } from "./dto/update-email.dto";
import { UpdatePasswordDto } from "./dto/update-password";
import { compare } from "bcrypt";
import { plainToInstance } from "class-transformer";
import { GetUserDto } from "./dto/get-user.dto";
import { hashData } from "src/shared/functions/hash-data.function";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async getSafeUser(id: number): Promise<GetUserDto> {
    return plainToInstance(User, await this.getById(id));
  }

  async getById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async remove(id: number) {
    const user = await this.getById(id);

    return this.userRepository.remove(user);
  }

  async updateEmail(id: number, newEmail: UpdateEmailDto) {
    const user = await this.getById(id);

    const updatedUser = this.userRepository.merge(user, newEmail);

    return this.userRepository.save(updatedUser);
  }

  async updatePassword(id: number, newPassword: UpdatePasswordDto) {
    const user = await this.getById(id);

    const isMatch = await compare(newPassword.currentPassword, user.password);

    if (!isMatch) {
      throw new UnauthorizedException("Passwords not match");
    }

    const newPasswordHashed = await hashData(newPassword.newPassword);

    const updatedUser = this.userRepository.merge(user, {
      password: newPasswordHashed,
    });

    return this.userRepository.save(updatedUser);
  }

  async updateRefreshToken(id: number, refreshToken: string) {
    const user = await this.getById(id);

    const newRefreshTokenHashed = await hashData(refreshToken);

    const updatedUser = this.userRepository.merge(user, {
      refreshToken: newRefreshTokenHashed,
    });

    return this.userRepository.save(updatedUser);
  }
}
