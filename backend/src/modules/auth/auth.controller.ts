import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('load-initial-data')
  async loadInitialData(): Promise<{message: string}> {
    return this.authService.loadInitialData();
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  async signIn(@Body() loginUserDto: LoginUserDto): Promise<{access_token: string}> {
    return this.authService.signIn(loginUserDto);
  }
}