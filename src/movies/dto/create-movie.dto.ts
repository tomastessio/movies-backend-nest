import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  
  @IsString()
  @IsNotEmpty()
  director: string;
  
  @IsDateString()
  @IsNotEmpty()
  releaseDate: string;
}
