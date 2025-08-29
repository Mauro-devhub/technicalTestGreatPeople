import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { Role } from '../shared/enums/role.enum';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { RolesService } from '../roles/roles.service';
import { CreateRoleDto } from '../roles/dtos/create-role.dto';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { CategoriesService } from '../categories/categories.service';
import { createCategoryDto } from '../categories/dtos/create-category.dto';
import { products } from './constants/products';
import { ProductsService } from '../products/products.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>, 
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
    private readonly categoriesService: CategoriesService,
    private readonly productService: ProductsService
  ) {}

  async loadInitialData(): Promise<{message: string}> {
    const roles = [
      { name: Role.ADMIN, createdAt: new Date(), updatedAt: new Date() },
      { name: Role.USER, createdAt: new Date(), updatedAt: new Date() },
    ];

    const users = [
      { username: 'admin', password: 'admin', roleId: 1 },
      { username: 'user', password: 'user', roleId: 2 },
    ];

    const categories = [
      { name: 'Electronics', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Accesories', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Clothes', createdAt: new Date(), updatedAt: new Date() },
    ];

    for (const role of roles) {
      try {
        await this.rolesService.createRole(role as CreateRoleDto);
      } catch (error) {
        throw new ForbiddenException('Error to create roles');
      }
    }

    for (const user of users) {
      try {
        await this.usersService.createUser(user as CreateUserDto);
      } catch (error) {
        throw new ForbiddenException('Error to create users');
      }
    }

    for (const category of categories) {
      try {
        await this.categoriesService.createCategory(category as createCategoryDto);
      } catch (error) {
        throw new ForbiddenException('Error to create categories');
      }
    }

    for (const product of products) {
      try {
        await this.productService.createProduct(product);
      } catch (error) {
        throw new ForbiddenException('Error to create products');
      }
    }

    return { message: 'Initial data loaded' };
  }

  async signIn(user: LoginUserDto): Promise<{access_token: string}> {
    const userFound = await this.userRepository.findOne({where: {username: user.username}});

    if (userFound.password !== user.password) {
      throw new NotFoundException('Invalid password or user not exists');
    }

    const payload = { id: userFound.id, username: userFound.username, role: userFound.role.name as Role };
    
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
