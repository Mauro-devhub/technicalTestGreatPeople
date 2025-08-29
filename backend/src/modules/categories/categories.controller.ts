import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthenticationJwtGuard } from "../auth/guards/authentication.guard";
import { Roles } from "../shared/decorators/roles.decorator";
import { Role } from "../shared/enums/role.enum";
import { CategoriesService } from "./categories.service";
import { CategoryEntity } from "src/entities/category.entity";
import { createCategoryDto } from "./dtos/create-category.dto";
import { UpdateCategoryDto } from "./dtos/update-category.dto";

@Controller('categories')
@UseGuards(AuthenticationJwtGuard)
@Roles(Role.ADMIN)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  
  @HttpCode(HttpStatus.OK)
  @Get()
  async getCategories(): Promise<CategoryEntity[]> {
    return this.categoriesService.getAllCategories();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getCategoryById(@Param('id') id: number): Promise<CategoryEntity> {
    return this.categoriesService.getCategoryById(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createCategory(@Body() createCategoryDto: createCategoryDto): Promise<CategoryEntity> {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @HttpCode(HttpStatus.PARTIAL_CONTENT)
  @Patch(':id')
  async updateCategory(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto): Promise<CategoryEntity> {
    return this.categoriesService.updateCategory(id, updateCategoryDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteCategory(@Param('id') id: number): Promise<string> {
    return this.categoriesService.deleteCategoryById(id);
  }
}