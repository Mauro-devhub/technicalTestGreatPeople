import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { CategoriesService } from '../categories/categories.service';
import { PaginateProductsDto } from './dtos/paginate-products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>,
    private readonly categoryService: CategoriesService,
  ) {}

  async getAllProducts(): Promise<ProductEntity[]> {
    try {
      return this.productRepository.find({
        order: {name: 'asc'},
        skip: 1,
        take: 10
      });
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  async getPaginatedProducts(paginateProductsDto: PaginateProductsDto): Promise<{products: ProductEntity[], totalPages: number}> {
    try {
      const p = await this.productRepository.find({
        order: {id: 'ASC'},
        skip: paginateProductsDto.page * paginateProductsDto.elementsPerPage,
        take: paginateProductsDto.elementsPerPage
      });
      
      return {products: p, totalPages: Math.ceil((await this.productRepository.count()) / paginateProductsDto.elementsPerPage)}
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  async getProductById(id: number): Promise<ProductEntity> {
    try {
      const product = await this.productRepository.findOne({ where: { id } });

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      return product;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  async createProduct(product: CreateProductDto): Promise<ProductEntity> {
    try {
      const p = await this.productRepository.findOne({where: {name: product.name}});

      if (p) {
        throw new BadRequestException('This product already exist');
      }

      const category = await this.categoryService.getCategoryById(product.categoryId);

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      const productToCreate = this.productRepository.create({
        ...product,
        category,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const productCreated = await this.productRepository.save(productToCreate);

      return productCreated;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  async updateProduct(id: number, updatedProduct: UpdateProductDto): Promise<ProductEntity> {
    try {
      const category = await this.categoryService.getCategoryById(updatedProduct.categoryId);

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      const productExist = await this.getProductById(id);

      console.log('productExist', productExist);

      if (!productExist) {
        throw new NotFoundException('Product not found');
      }

      const productUpdated = {name: updatedProduct.name, description: updatedProduct.description, price: updatedProduct.price, stock: updatedProduct.stock};

      await this.productRepository.update(id, {...productUpdated, category, updatedAt: new Date()});

      return this.getProductById(id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  async deleteProduct(id: number): Promise<string> {
    try {
      const productRemoved = await this.productRepository.delete(id);

      if (productRemoved.affected > 0) {
        return 'Product deleted successfully';
      }
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}