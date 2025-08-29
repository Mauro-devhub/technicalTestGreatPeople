export class CreateProductDto {
  name!: string;
  price!: number;
  categoryId!: number; 
  stock!: number;
  description?: string;
}