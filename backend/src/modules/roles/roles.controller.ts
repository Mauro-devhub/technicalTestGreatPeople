import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Roles } from '../shared/decorators/roles.decorator';
import { Role } from '../shared/enums/role.enum';
import { RoleEntity } from 'src/entities/role.entity';
import { CreateRoleDto } from './dtos/create-role.dto';
import { UpdateRoleDto } from './dtos/update-role.dto';
import { AuthenticationJwtGuard } from '../auth/guards/authentication.guard';

@Controller('roles')
@UseGuards(AuthenticationJwtGuard)
@Roles(Role.ADMIN)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getRoles(): Promise<RoleEntity[]> {
    return this.rolesService.getAllRoles();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getRoleById(@Param('id') id: number): Promise<RoleEntity> {
    return this.rolesService.getRoleById(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDto): Promise<RoleEntity> {
    return this.rolesService.createRole(createRoleDto);
  }

  @HttpCode(HttpStatus.PARTIAL_CONTENT)
  @Patch(':id')
  async updateRole(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto): Promise<RoleEntity> {
    return this.rolesService.updateRole(id, updateRoleDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteProduct(@Param('id') id: number): Promise<string> {
    return this.rolesService.deleteRoleById(id);
  }
}