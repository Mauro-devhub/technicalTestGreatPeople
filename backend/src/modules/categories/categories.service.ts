import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CategoryEntity } from "src/entities/category.entity";
import { createCategoryDto } from "./dtos/create-category.dto";
import { UpdateCategoryDto } from "./dtos/update-category.dto";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>
  ) {}
  
  async getAllCategories(): Promise<CategoryEntity[]> {
    try {
      return this.categoryRepository.find();
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  async getCategoryById(id: number): Promise<CategoryEntity> {
    try {
      const category = await this.categoryRepository.findOne({ where: { id } });

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      return category;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  async createCategory(createCategoryDto: createCategoryDto): Promise<CategoryEntity> {
    try {
      const categoryObj = await this.categoryRepository.create({name: createCategoryDto.name, createdAt: new Date(), updatedAt: new Date() });
      const categoryCreated = await this.categoryRepository.save(categoryObj);

      return categoryCreated;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  async updateCategory(id: number, updatedCategoryDto: UpdateCategoryDto): Promise<CategoryEntity> {
    try {
      const category = await this.getCategoryById(id);
      const categoryUpdated = await this.categoryRepository.update(id, {...category, name: updatedCategoryDto.name, updatedAt: new Date()});

      if (categoryUpdated.affected > 0) {
        return this.getCategoryById(id);
      }
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  async deleteCategoryById(id: number): Promise<string> {
    try {
      const categoryRemoved = await this.categoryRepository.delete(id);

      if (categoryRemoved.affected > 0) {
        return 'Category deleted successfully';
      }
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}