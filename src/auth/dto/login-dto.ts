import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginDto {
    
    // email must be a valid email address
    @IsEmail()
    email: string;

    // password must be at least 6 characters long, string, and without blank spaces
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6)
    password: string;
}