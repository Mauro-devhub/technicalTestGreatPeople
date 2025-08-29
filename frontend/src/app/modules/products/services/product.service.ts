import { inject, Injectable, signal } from "@angular/core";
import { ProductModel } from "../../models/product.model";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { environment } from "../../../../../environments";
import { UpdateProductDto } from "../dtos/update-product.dto";
import { CreateProductDto } from "../dtos/create-product.dto";
import { PaginateProductsDto } from "../dtos/paginate-products.dto";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products = signal<ProductModel[]>([]);
  http = inject(HttpClient);
  totalPages = signal<number>(0);
  paginatedProducts = signal<PaginateProductsDto>({page: 0, elementsPerPage: 10})

  modifyPagination(page: number, elementsPerPage: number): void {
    this.paginatedProducts.set({page, elementsPerPage});
  }

  getAllProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${environment.apiUrl}products`)
      .pipe(map(p => {
        this.products.set(p);
        return p;
      }));
  }

  getPaginatedProducts(paginateProductsDto: PaginateProductsDto): Observable<{products: ProductModel[], totalPages: number}>{
    return this.http.post<{products: ProductModel[], totalPages: number}>(`${environment.apiUrl}products`, paginateProductsDto)
      .pipe(map(p => {
        this.products.set(p.products);
        this.totalPages.set(p.totalPages);
        return p;
      }));
  }

  updateProduct(id: number, updateProduct: UpdateProductDto): Observable<ProductModel> {
    return this.http.patch<ProductModel>(`${environment.apiUrl}products/${id}`, updateProduct)
      .pipe(map(p => {
        this.products.update(products =>
          products.map(prod => prod.id === p.id ? p : prod)
        );
        return p;
      }));
  }

  createProduct(createProduct: CreateProductDto): Observable<ProductModel> {
    return this.http.post<ProductModel>(`${environment.apiUrl}products`, createProduct)
      .pipe(map(p => {
        this.products.update(products => [...products, p]);
        return p;
      }));
  }

  removeProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}products/${id}`)
      .pipe(map(p => {
        this.products.update(products => [...products.filter((p) => p.id !== id)]);
        return p;
      }));
  }
}