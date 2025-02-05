import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";


export class RegisterDto {
    // name must be a string with at least 1 character and without blank spaces
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    name: string;

    // email must be a valid email address
    @IsEmail()
    email: string;

    // password must be at least 6 characters long, string, and without blank spaces
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6)
    password: string;
}