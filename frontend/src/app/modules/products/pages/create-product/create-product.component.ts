import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormProductComponent } from '../../../shared/components/form-product/form-product.component';
import { Router } from '@angular/router';
import { CreateProductDto } from '../../dtos/create-product.dto';
import { CategoriesService } from '../../../shared/services/categories.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'create-product-page',
  imports: [
    CommonModule,
    FormProductComponent
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent {
  router = inject(Router);
  categoriesService = inject(CategoriesService);
  productsService = inject(ProductService);
  isLoading = signal<boolean>(false);

  categories = computed(() => this.categoriesService.categories());

  cancelCreation(): void {
    this.router.navigate(['dashboard']);
  }

  createProduct(createProductDto: CreateProductDto): void {
    this.isLoading.set(true);

    const trsf = {
      ...createProductDto,
      categoryId: Number(createProductDto.categoryId),
      price: Number(createProductDto.price),
      stock: Number(createProductDto.stock)
    }

    this.productsService.createProduct(trsf).subscribe({
      next: (resp) => {
        alert('producto creado');
      },
      error: (err) => {
        this.isLoading.set(false);
        console.error('Error en crear producto:', err)
      },
      complete: () => this.isLoading.set(false)
    });
  }
}
