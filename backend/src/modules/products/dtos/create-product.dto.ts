import { IsInt, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  name: string;

  @IsString()
  @MaxLength(250)
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsInt()
  stock: number;

  @IsInt()
  @IsNotEmpty()
  categoryId: number;
}