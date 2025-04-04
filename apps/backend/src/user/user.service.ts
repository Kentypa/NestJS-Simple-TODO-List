import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { UpdateEmailDto } from "./dto/update-email.dto";
import { UpdatePasswordDto } from "./dto/update-password";
import { compare, hash } from "bcrypt";
import { EncryptionConfig } from "src/config/encription";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user || user.password !== password) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return user;
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

    const newPasswordHashed = await hash(
      newPassword.newPassword,
      EncryptionConfig.SALT_OR_ROUNDS
    );

    const updatedUser = this.userRepository.merge(user, {
      password: newPasswordHashed,
    });

    return this.userRepository.save(updatedUser);
  }
}
