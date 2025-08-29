import { PartialType } from "@nestjs/mapped-types";
import { createCategoryDto } from "./create-category.dto";

export class UpdateCategoryDto extends PartialType(createCategoryDto) {}