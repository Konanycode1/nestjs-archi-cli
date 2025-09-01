import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'features/user/core/dto/create-user.dto';
import { IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';
import { IsPhoneNumberCI } from 'utils/validators/phoneNumber.validate';

export class UpdateUserDto extends PartialType(CreateUserDto) {

        @IsOptional()
        @IsString()
        fullName: string;
     
         @IsString()
         username: string;
        
         @IsOptional()
         @IsEmail()
         email: string;
        
         @IsOptional()
         @IsString()
         address: string;
        
         @IsOptional()
         @IsPhoneNumberCI({ message: 'Numéro invalide pour la CI' })
         phone: string;
        
         @IsOptional()
         @IsString()
         dateOfBirth: Date;

         @IsString()
         @IsOptional()
         numberPermis: string;

         @IsString()
         @IsOptional()
         numberCarteGrise: string;

         @IsString()
         @IsOptional()
         numberAssurance: string;

         @IsString()
         @IsOptional()
         numberMatricule: string;

         @IsString()
         @IsOptional()
         numberPermisDate: string;

         @IsString()
         @IsOptional()
         numberAssuranceDate: string;

         @IsString()
         @IsOptional()
         numberMatriculeDate: string;

         @IsString()
         @IsOptional()
         numberCarteGriseDate: string;

         @IsString()
         @IsOptional()
         role: string;
}
