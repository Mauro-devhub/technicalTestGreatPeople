import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoriesService } from '../../../shared/services/categories.service';
import { LocalStorageService } from '../../../shared/services/localstorage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'products-page',
  imports: [
    CommonModule,
    ButtonComponent,
    RouterModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  router = inject(Router);
  productsService = inject(ProductService);
  categoriesService = inject(CategoriesService);
  localStorageService = inject(LocalStorageService);
  subscriptionRequest!: Subscription;

  products = computed(() => this.productsService.products());
  categories = computed(() => this.categoriesService.categories());

  currentStatusPagination = computed(() => this.productsService.paginatedProducts());
  totalPages = computed(() => this.productsService.totalPages());
  
  userLogged = signal<{id: number, role: string, username: string} | null>(null);

  ngOnInit(): void {
    this.loadProducts();
    this.userLogged.set(this.localStorageService.getItem('user'));
  }

  loadProducts(): void {
    this.subscriptionRequest = this.productsService.getPaginatedProducts(this.productsService.paginatedProducts()).subscribe();
  }

  removeProduct(id: number): void {
    this.subscriptionRequest = this.productsService.removeProduct(id).subscribe({
      next: (resp) => {
        alert('producto eliminado')
      },
      error: (err) => console.log('Error en eliminar producto:', err)
    });
  }

  backPage(): void {
    this.productsService.modifyPagination(this.currentStatusPagination().page - 1, this.currentStatusPagination().elementsPerPage);
    this.subscriptionRequest = this.productsService.getPaginatedProducts(this.currentStatusPagination()).subscribe();
  }

  nextPage(): void {
    this.productsService.modifyPagination(this.currentStatusPagination().page + 1, this.currentStatusPagination().elementsPerPage);
    this.subscriptionRequest = this.productsService.getPaginatedProducts(this.currentStatusPagination()).subscribe();
  }

  navigateToUpdateProduct(id: number): void {
    this.router.navigate([`/dashboard/update-product/${id}`]);
  }

  navigateToCreateProduct(): void {
    this.router.navigate(['/dashboard/create-product']);
  }

  ngOnDestroy(): void {
    this.subscriptionRequest.unsubscribe();
  }
}
