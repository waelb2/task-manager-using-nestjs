import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './DTO/auth-credentials.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}
  @Post('/signup')
  async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    return await this.AuthService.signUp(authCredentialsDto);
  }
  @Post('/login')
  async login(
    @Body() loginCredentials: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return await this.AuthService.login(loginCredentials);
  }
  @Get('/users')
  async getUsers(): Promise<User[]> {
    return await this.AuthService.getAllUsers();
  }
}
