import { CategoryModel } from "./category.model";

export class ProductModel {
  id!: number;
  name!: string;
  description!: string;
  price!: number;
  stock!: number;
  category!: CategoryModel;
  createdAt!: Date;
  updatedAt!: Date;
}