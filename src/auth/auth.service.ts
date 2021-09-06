import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { genSalt, hash, compare } from 'bcryptjs';
import { InjectModel } from 'nestjs-typegoose';
import { UserDto } from './dto/user.dto';
import { UserModel } from './user.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>, private jwtService: JwtService
  ) { }
  async createUser(dto: UserDto) {
    const salt = await genSalt(10)
    const newUSer = new this.userModel({
      email: dto.login,
      passwordHash: await hash(dto.password, salt)
    })
    return newUSer.save()
  }

  async findUser(email: string) {
    return this.userModel.findOne({ email })
  }

  async validateUser(email: string, password: string): Promise<Pick<UserModel, "email">> {
    const user = await this.findUser(email)
    if (!user) {
      throw new UnauthorizedException("не правильный логин или пароль");
    }
    const isComparePassword = compare(user.passwordHash, password);
    if (!isComparePassword) {
      throw new UnauthorizedException("не правильный логин или пароль");
    }

    return { email: user.email }
  }

  async login(email: string) {
    const payload = { email }
    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}
