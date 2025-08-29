import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  password: string;

  @IsInt()
  @IsNotEmpty()
  roleId: number;
}