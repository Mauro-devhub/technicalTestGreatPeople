import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormProductComponent } from '../../../shared/components/form-product/form-product.component';
import { UpdateProductDto } from '../../dtos/update-product.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductModel } from '../../../models/product.model';
import { CategoriesService } from '../../../shared/services/categories.service';

@Component({
  selector: 'update-product-page',
  imports: [
    FormProductComponent
  ],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent implements OnInit {
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  productsService = inject(ProductService);
  categoriesService = inject(CategoriesService);
  isLoading = signal<boolean>(false);

  products = computed(() => this.productsService.products());
  categories = computed(() => this.categoriesService.categories());
  productId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  product!: ProductModel;

  ngOnInit(): void {
    this.setProduct();
    if (this.categoriesService.categories().length <= 0) {
      this.categoriesService.getAllCategories().subscribe();
    }
  }

  setProduct() {
    const p = this.products().find((p) => p.id === this.productId);
    if (p) {
      this.product = p;
    }
  }

  cancelCreation(): void {
    this.router.navigate(['dashboard']);
  }

  updateProduct(updateProduct: UpdateProductDto): void {
    this.isLoading.set(true);

    const trsf = {
      ...updateProduct,
      categoryId: Number(updateProduct.categoryId),
      price: Number(updateProduct.price),
      stock: Number(updateProduct.stock)
    }

    this.productsService.updateProduct(this.productId, trsf).subscribe({
      next: (resp) => {
        alert('producto actualizado');
      },
      error: (err) => {
        this.isLoading.set(false);
        console.error('Error en actualizar producto:', err)
      },
      complete: () => this.isLoading.set(false)
    });
  }
}
