import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthenticationJwtGuard } from '../auth/guards/authentication.guard';
import { Roles } from '../shared/decorators/roles.decorator';
import { Role } from '../shared/enums/role.enum';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductEntity } from 'src/entities/product.entity';
import { CreateProductDto } from './dtos/create-product.dto';
import { PaginateProductsDto } from './dtos/paginate-products.dto';

@Controller('products')
@UseGuards(AuthenticationJwtGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @HttpCode(HttpStatus.OK)
  // @Get()
  // async getProducts(): Promise<ProductEntity[]> {
  //   return this.productsService.getAllProducts();
  // }

  @HttpCode(HttpStatus.OK)
  @Post('pagination')
  async getPaginatedProducts(@Body() paginateProductsDto: PaginateProductsDto): Promise<{products: ProductEntity[], totalPages: number}> {
    return this.productsService.getPaginatedProducts(paginateProductsDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getProductById(@Param('id') id: number): Promise<ProductEntity> {
    return this.productsService.getProductById(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.ADMIN)
  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto): Promise<ProductEntity> {
    return this.productsService.createProduct(createProductDto);
  }

  @HttpCode(HttpStatus.PARTIAL_CONTENT)
  @Roles(Role.ADMIN)
  @Patch(':id')
  async updateProduct(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto): Promise<ProductEntity> {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteProduct(@Param('id') id: number): Promise<string> {
    return this.productsService.deleteProduct(id);
  }
}