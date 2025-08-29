import { IsString, MaxLength } from "class-validator";

export class createCategoryDto {
  @IsString()
  @MaxLength(60)
  name: string;
}