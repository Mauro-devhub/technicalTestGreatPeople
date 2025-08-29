import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RoleEntity } from "src/entities/role.entity";
import { Repository } from "typeorm";
import { CreateRoleDto } from "./dtos/create-role.dto";
import { UpdateRoleDto } from "./dtos/update-role.dto";

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity) private roleRepository: Repository<RoleEntity>
  ) {}
  
  async getAllRoles(): Promise<RoleEntity[]> {
    try {
      return this.roleRepository.find();
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  async getRoleById(id: number): Promise<RoleEntity> {
    try {
      const role = await this.roleRepository.findOne({ where: { id } });

      if (!role) {
        throw new NotFoundException('Role not found');
      }

      return role;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  async createRole(role: CreateRoleDto): Promise<RoleEntity> {
    try {
      const roleObj = await this.roleRepository.create({name: role.name, createdAt: new Date(), updatedAt: new Date() });
      const roleCreated = await this.roleRepository.save(roleObj);

      return roleCreated;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  async updateRole(id: number, updatedRole: UpdateRoleDto): Promise<RoleEntity> {
    try {
      const role = await this.getRoleById(id);
      const roleUpdated = await this.roleRepository.update(id, {...role, name: updatedRole.name, updatedAt: new Date() });

      if (roleUpdated.affected > 0) {
        return this.getRoleById(id);
      }
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  async deleteRoleById(id: number): Promise<string> {
    try {
      const roleRemoved = await this.roleRepository.delete(id);

      if (roleRemoved.affected > 0) {
        return 'Role deleted successfully';
      }
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}