import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "src/entities/user.entity";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { RolesService } from "../roles/roles.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    private readonly rolesService: RolesService
  ) {}
  
  async getAllUsers(): Promise<UserEntity[]> {
    try {
      return this.userRepository.find();
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  async getUserById(id: number): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  async createUser(user: CreateUserDto): Promise<UserEntity> {
    try {
      const role = await this.rolesService.getRoleById(user.roleId);

      const userObj = await this.userRepository.create({...user, role, createdAt: new Date(), updatedAt: new Date()});
      const userCreated = await this.userRepository.save(userObj);

      return userCreated;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  async updateUser(id: number, updatedUser: UpdateUserDto): Promise<UserEntity> {
    try {
      const user = await this.getUserById(id);

      const role = await this.rolesService.getRoleById(updatedUser.roleId);

      const userUpdated = await this.userRepository.update(id, {
        ...user,
        username: updatedUser.username,
        password: updatedUser.password,
        role,
        updatedAt: new Date()
      });

      if (userUpdated.affected > 0) {
        return this.getUserById(id);
      }
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  async deleteUserById(id: number): Promise<string> {
    try {
      const userRemoved = await this.userRepository.delete(id);

      if (userRemoved.affected > 0) {
        return 'User deleted successfully';
      }
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}