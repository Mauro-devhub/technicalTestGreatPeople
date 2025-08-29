import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;
}