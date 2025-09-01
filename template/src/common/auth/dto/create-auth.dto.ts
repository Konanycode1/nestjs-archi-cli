import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';


export class CreateAuthDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}