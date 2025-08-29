import { inject, Injectable, signal } from "@angular/core";
import { CategoryModel } from "../../models/category.model";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { environment } from "../../../../../environments";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  categories = signal<CategoryModel[]>([]);
  http = inject(HttpClient);

  constructor() {
    this.getAllCategories();
  }

  getAllCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(`${environment.apiUrl}categories`)
      .pipe(map(c => {
        this.categories.set(c);
        return c;
      }));
  }
}