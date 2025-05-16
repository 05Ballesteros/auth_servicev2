import { IsString, IsNotEmpty } from "class-validator";

export class LoginAuthDto {
  @IsString()
  @IsNotEmpty()
  Username: string;

  @IsString()
  @IsNotEmpty()
  Password: string;
}
