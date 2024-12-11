import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './DTO/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JWTPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private JwtService: JwtService,
    private ConfigService: ConfigService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const newUser = new User();

    // hashing user password
    const hashedPassword = await this.hashPassword(password);

    newUser.username = username;
    newUser.password = hashedPassword;
    try {
      await this.userRepository.save(newUser);
    } catch (error) {
      if (error.code == 23505) {
        throw new ConflictException('Username already exists');
      }
      throw new InternalServerErrorException();
    }
  }

  async login(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const validUser = await this.validateUser(authCredentialsDto);
    const payload: JWTPayload = {
      userId: validUser.id,
      username: validUser.username,
    };
    const accessToken = this.JwtService.sign(payload);

    return { accessToken };
  }

  async validateUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { username, password } = authCredentialsDto;
    const userFound = await this.userRepository.findOne({
      where: { username },
    });

    if (userFound) {
      const isMatch = await bcrypt.compare(password, userFound.password);

      if (isMatch) {
        return userFound;
      }
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
}
