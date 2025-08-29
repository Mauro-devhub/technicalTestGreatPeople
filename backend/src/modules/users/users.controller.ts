import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { AuthenticationJwtGuard } from '../auth/guards/authentication.guard';
import { Roles } from '../shared/decorators/roles.decorator';
import { Role } from '../shared/enums/role.enum';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
@UseGuards(AuthenticationJwtGuard)
@Roles(Role.ADMIN)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllUsers(): Promise<UserEntity[]> {
    return this.usersService.getAllUsers();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getUserById(@Param(':id') id: number): Promise<UserEntity> {
    return this.usersService.getUserById(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createUser(user: CreateUserDto): Promise<UserEntity> {
    return this.usersService.createUser(user);
  }

  @HttpCode(HttpStatus.PARTIAL_CONTENT)
  @Patch(':id')
  async updateProduct(@Param(':id') id: number, @Body() updatedProduct: UpdateUserDto): Promise<UserEntity> {
    return this.usersService.updateUser(id, updatedProduct);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteProduct(@Param('id') id: number): Promise<string> {
    return this.usersService.deleteUserById(id);
  }
}